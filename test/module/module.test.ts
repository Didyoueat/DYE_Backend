import { createConnection } from "typeorm";
import ApiError from "@modules/api.error";
import httpStatus from "http-status";
import env from "@modules/env";
import dotenv from "dotenv";
import path from "path";
import JWT from "@modules/jwt";
import redisClient from "@modules/redis";
import logger from "@modules/logger";
import { propertyCheck } from "@modules/property";
import slack from "@modules/slack";
import tableCheck from "@modules/table.check";
import fs from "fs";

beforeAll(async () => {
    await createConnection()
        .then(() => console.log("🚀 DB Connected"))
        .catch((err) => console.log(err));
});

describe("Module Test", () => {
    test("커스텀 Error 모듈 테스트", () => {
        try {
            throw new Error("오류 테스트");
        } catch (err: any) {
            const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
            const message = err.message || httpStatus[statusCode];
            const error = new ApiError(statusCode, message, err.stack);
            const stack = error.stack.split("\n")[1].split("(");

            expect(error.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
            expect(error.message).toEqual("오류 테스트");
            expect(stack[stack.length - 1].split(":")[0]).toEqual(__filename);
        }
    });

    test("환경변수 핸들링 모듈 테스트", () => {
        dotenv.config({ path: path.resolve(__dirname, "../../.env.dev") });

        expect(env.nodeEnv).toEqual(process.env.NODE_ENV);
        expect(env.port).toEqual(5000);
        expect(env.slackWebhook).toEqual(process.env.SLACK_WEBHOOK);
        expect(env.jwtSecret.access).toEqual(process.env.JWT_ACCESS_SECRET);
        expect(env.jwtSecret.refresh).toEqual(process.env.JWT_REFRESH_SECRET);
        expect(env.dbConfig.username).toEqual(process.env.DATABASE_USERNAME);
        expect(env.dbConfig.password).toEqual(process.env.DATABASE_PASSWORD);
        expect(env.dbConfig.database).toEqual(process.env.DATABASE_NAME);
        expect(env.dbConfig.host).toEqual(process.env.DATABASE_HOST);
        expect(env.dbConfig.port).toEqual(3306);
        expect(env.awsConfig.accessKey).toEqual(process.env.AWS_IAM_ACCESS_KEY);
        expect(env.awsConfig.secretKey).toEqual(process.env.AWS_IAM_SECRET_KEY);
        expect(env.awsConfig.region).toEqual(process.env.AWS_S3_REGION);
        expect(env.awsConfig.bucket).toEqual(process.env.AWS_S3_BUCKET);
        expect(env.awsConfig.redisPort).toEqual(process.env.REDIS_PORT);
    });

    test("JWT 모듈 테스트", async () => {
        const userId = 3;
        const access = JWT.accessSign(userId, 0);
        const refresh = await JWT.refreshSign(userId, 0);

        expect(JWT.accessVerify(access).valid).toEqual(true);
        expect(JWT.accessVerify(access + "a").valid).toEqual(false);
        expect((await JWT.refreshVerity(refresh, userId, 0)).valid).toEqual(true);
    });

    test("로깅 모듈 테스트", () => {
        const errMessage = "로깅 테스트";
        try {
            throw new Error(errMessage);
        } catch (err: any) {
            const error = new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message, err.stack);
            const log = logger.error(error.stack);
            const { statusCode, stack, message } = error;
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1 < 10 ? "0" + String(today.getMonth() + 1) : String(today.getMonth() + 1);
            const day = today.getDate() < 10 ? "0" + String(today.getDate) : String(today.getDate());

            fs.readFile(__dirname + `/../../../logs/error/${year}-${month}-${day}.error.log`, "utf-8", async (err, data) => {
                if (err) return console.log(err);
                const nowErr = data.split("||")[data.split("||").length - 1].split("\n");

                expect(nowErr[0].slice(16)).toEqual(errMessage);
                expect(nowErr[1]).toEqual(error.stack.split("\n")[1]);
            });
            // slack({ log: logger.error(error.stack), statusCode, stack, message });
        }
    });

    test("요청 데이터 확인 모듈 테스트", () => {
        // const user: infoTypes.user = {
        //     staff: true,
        //     loginStatus: "몰러",
        //     email: "email@email.com",
        //     password: "asdf",
        //     name: "기서수",
        //     age: 26,
        //     gender: "man",
        //     phone: "010123123",
        //     address: "aslkdjflkajsdlkfjlasjdflkjasdlkjflaksdjflkjasdlfjlasjdflkasjldkfjlsakjf",
        //     paymentState: "몰러",
        //     paymentKey: "adfasdf",
        // };
        // const shop: infoTypes.shop = {
        //     businessName: "shopName",
        //     businessNumber: "asdfa2342134",
        //     businessPhone: "1232134-2134-123",
        //     password: "123123",
        //     dayOff: 0,
        //     latitude: 123.123,
        //     longitude: 123.123,
        //     name: "asdf",
        //     phone: "123123",
        //     origin: null,
        //     content: null,
        //     officeHour: null,
        //     temporaryDayEnd: null,
        //     temporaryDayStart: null,
        //     address: "asdfasdf",
        // };
        // propertyCheck(user, shop);
    });

    test("데이터 유효성 검사 모듈 테스트", async () => {
        await tableCheck({ user: 1, shop: 3, dish: [19, 20, 21] });
    });
});
