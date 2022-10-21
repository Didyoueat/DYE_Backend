import { mockRequest, mockResponse } from "jest-mock-req-res";
import { Response, Request, NextFunction } from "express";
import { createConnection } from "typeorm";
import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";
import JWT from "@modules/jwt";
import authorization from "@middlewares/authorization";
import { errorHandler } from "@middlewares/error";
import afterware from "@middlewares/afterware";
import ApiError from "@modules/api.error";
import httpStatus from "http-status";

beforeAll(async () => {
    await createConnection()
        .then(() => console.log("🚀 DB Connected"))
        .catch((err) => console.log(err));
});

describe("Middleware Test", () => {
    interface MockResponse extends Response {
        append: jest.Mock;
        attachment: jest.Mock;
        clearCookie: jest.Mock;
        contentType: jest.Mock;
        cookie: jest.Mock;
        download: jest.Mock;
        end: jest.Mock;
        format: jest.Mock;
        get: jest.Mock;
        header: jest.Mock;
        json: jest.Mock;
        jsonp: jest.Mock;
        links: jest.Mock;
        location: jest.Mock;
        redirect: jest.Mock;
        render: jest.Mock;
        send: jest.Mock;
        sendFile: jest.Mock;
        sendStatus: jest.Mock;
        set: jest.Mock;
        status: jest.Mock;
        type: jest.Mock;
        vary: jest.Mock;
    }

    interface MockRequest extends Request {
        accepts: jest.Mock;
        acceptsCharsets: jest.Mock;
        acceptsEncodings: jest.Mock;
        acceptsLanguages: jest.Mock;
        get: jest.Mock;
        header: jest.Mock;
        is: jest.Mock;
        range: jest.Mock;
        headers: any;
    }

    describe("JWT 인증 Test", () => {
        const res: MockResponse = mockResponse({});
        const next: NextFunction = jest.fn();
        const token = {
            userId: 1,
            valid: {
                access: undefined,
                refresh: undefined,
            },
            accessExpired: {
                access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzkxNjI3OTEsImdyb3VwIjowLCJpYXQiOjE2NDMwNTU0NjIsImV4cCI6MTY0MzA1NTUyMn0.Ec5yZyeVG-Poqq0wHBAfn4E2vZ3V1a2Td4OdD45tPMI",
            },
            allExpired: {
                access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAwMjg1NjEsImlhdCI6MTY0MzAyNDk4OCwiZXhwIjoxNjQzMDI1MDQ4fQ.T7jZVkvpwXk632oGB4xAVjEynyYvm7jopTFizyilezc",
                refresh:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDMwMjQ5ODgsImV4cCI6MTY0MzAyNTA0OH0.oBILBgJZCCiMWSomenG9w7MXVy44QVYzKdEwX6jMiCM",
            },
        };

        test("JWT 발급", async () => {
            token.valid.access = JWT.accessSign(token.userId, 0);
            token.valid.refresh = await JWT.refreshSign(token.userId, 0);

            expect(typeof token.valid.access).toEqual("string");
            expect(typeof token.valid.refresh).toEqual("string");
        });

        test("생성된 토큰이 정상이라면 next를 호출해야함", async () => {
            const req: MockRequest = mockRequest();
            req.headers = {
                access_token: token.valid.access,
                refresh_token: token.valid.refresh,
            };
            req.body.requestId = token.userId;
            const decoded = jwt.decode(token.valid.access);

            expect(await authorization(req, res)).toEqual({
                requestId: parseInt(String(decoded["id"]).substring(7), 10),
                group: decoded["group"],
            });
        });

        test("Access Token만 만료되었을 경우 next를 호출해야함", async () => {
            const req: MockRequest = mockRequest();
            req.headers = {
                access_token: token.accessExpired.access,
                refresh_token: token.valid.refresh,
            };
            req.body.requestId = token.userId;
            const today = Date.now() / 1000;
            const accessDecoded = jwt.decode(token.accessExpired.access);
            const refreshDecoded = jwt.decode(token.valid.refresh);

            expect(today > accessDecoded["exp"]).toEqual(true);
            expect(today < refreshDecoded["exp"]).toEqual(true);
            expect(await authorization(req, res)).toEqual({
                requestId: parseInt(String(accessDecoded["id"]).substring(7), 10),
                group: accessDecoded["group"],
            });
        });

        test("두 토큰이 모두 만료되었을 경우 401 코드를 반환해야함", async () => {
            const req: MockRequest = mockRequest();
            req.headers = {
                access_token: token.allExpired.access,
                refresh_token: token.allExpired.refresh,
            };
            req.body.requestId = token.userId;

            await authorization(req, res);

            expect(res.status).toBeCalledWith(401);
            expect(res.send).toBeCalledWith("유효하지 않는 토큰입니다.");
        });

        test("하나라도 이상한 토큰이 들어올 경우 401 오류를 반환해야함", async () => {
            const req: MockRequest = mockRequest();
            const rand = Math.floor(Math.random() * 2);
            req.headers = {
                access_token: undefined,
                refresh_token: undefined,
            };
            req.body.requestId = token.userId;

            if (rand === 1) {
                req.headers.access_token = token.valid.access + "x";
                req.headers.refresh_token = token.valid.refresh;
            } else {
                req.headers.access_token = token.valid.access;
                req.headers.refresh_token = token.valid.refresh + "y";
            }

            await authorization(req, res);

            expect(res.status).toBeCalledWith(401);
            expect(res.send).toBeCalledWith("유효하지 않는 토큰입니다.");
        });

        test("하나라도 빈 토큰이 들어올 경우 400 오류를 반환해야함", async () => {
            const req: MockRequest = mockRequest();
            const rand = Math.floor(Math.random() * 3);
            req.headers = {
                access_token: undefined,
                refresh_token: undefined,
            };
            req.body.requestId = token.userId;

            if (rand === 1) {
                req.headers.refresh_token = token.valid.refresh;
            } else if (rand === 2) {
                req.headers.access_token = token.valid.access;
            }

            try {
                await authorization(req, res);
            } catch (err) {
                expect(err.statusCode).toEqual(400);
                expect(err.message).toEqual("잘못된 요청입니다.");
            }
        });
    });

    describe("Error Middleware Test", () => {
        test("Error Handler가 정상 작동해야함", () => {
            const res: MockResponse = mockResponse({});
            const req: MockRequest = mockRequest();
            const next: NextFunction = jest.fn();
            const error: ApiError = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "오류 발생");

            errorHandler(error, req as Request, res as Response, next);

            expect(res.status).toBeCalledWith(500);
            expect(res.send).toBeCalledWith({
                code: error.statusCode,
                message: error.message,
                stack: error.stack,
            });
            expect(next).not.toBeCalled();
        });
    });
});
