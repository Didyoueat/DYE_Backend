import request from "supertest";
import { createConnection } from "typeorm";
import app from "../../src/app";

beforeAll(async () => {
    await createConnection()
        .then(() => console.log("🚀 DB Connected"))
        .catch((err) => console.log(err));
});

describe("Users", () => {
    describe("Read", () => {
        describe("전체 회원 구독 리스트 조회", () => {
            test("전체 회원 구독 리스트 갖고 와야함", async () => {
                const response = await request(app).get("/v0/users/subscriptions");
                expect(response.status).toBe(200);
            });
        });

        describe("회원 구독 리스트 조회", () => {
            test("회원 구독 리스트 갖고 와야함", async () => {
                const response = await request(app).get("/v0/users/1/subscriptions");
                expect(response.status).toBe(200);
            });

            test("잘못된 user_id로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/users/asdf/subscriptions");
                expect(response.status).toBe(400);
            });
        });

        describe("회원 구독 정보 조회", () => {
            test("회원 구독 정보 갖고 와야함", async () => {
                const response = await request(app).get("/v0/users/1/subscriptions/1");
                expect(response.status).toBe(200);
            });

            test("잘못된 user_id로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/users/asdf/subscriptions/1");
                expect(response.status).toBe(400);
            });

            test("잘못된 subscriptions_id로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/users/1/subscriptions/asdf");
                expect(response.status).toBe(400);
            });
        });

        describe("전체 회원 주문 리스트 조회", () => {
            test("전체 회원 주문 리스트 갖고 와야함", async () => {
                const response = await request(app).get("/v0/users/orders");
                expect(response.status).toBe(200);
            });
        });

        describe("회원 주문 리스트 조회", () => {
            test("회원 주문 리스트 갖고 와야함", async () => {
                const response = await request(app).get("/v0/users/1/orders");
                expect(response.status).toBe(200);
            });

            test("잘못된 user_id로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/users/asdf/orders");
                expect(response.status).toBe(400);
            });
        });

        describe("회원 주문 정보 조회", () => {
            test("회원 주문 정보 갖고 와야함", async () => {
                const response = await request(app).get("/v0/users/1/orders/1");
                expect(response.status).toBe(200);
            });

            test("잘못된 user_id로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/users/asdf/orders/1");
                expect(response.status).toBe(400);
            });

            test("잘못된 subscriptions_id로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/users/1/orders/asdf");
                expect(response.status).toBe(400);
            });
        });
    });
});
