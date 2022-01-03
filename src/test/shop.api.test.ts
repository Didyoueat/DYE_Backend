import request from "supertest";
import { createConnection } from "typeorm";
import app from "../app";

beforeAll(async () => {
    await createConnection()
        .then(() => console.log("🚀 DB Connected"))
        .catch((err) => console.log(err));
});

describe("Shops", () => {
    describe("가게 조회", () => {
        describe("전체 가게 리스트", () => {
            test("모든 가게 리스트 갖고 와야함", async () => {
                const response = await request(app).get("/v0/shops");
                expect(response.status).toBe(200);
            });
        });

        describe("주변 가게 리스트", () => {
            test("주변 가게 리스트를 갖고 와야함", async () => {
                const response = await request(app).get("/v0/shops/around?latitude=37.5741&longitude=127.016&radius=2000");
                expect(response.status).toBe(200);
            });

            test("잘못된 Query String으로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/shops/around?latitude=37.5741&longitude=127.016");
                expect(response.status).toBe(400);
            });
        });

        describe("가게 정보 조회", () => {
            test("해당 가게의 정보를 갖고 와야함", async () => {
                const response = await request(app).get("/v0/shops/1");
                expect(response.status).toBe(200);
            });

            test("잘못된 Parameter로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/shops/asdf");
                expect(response.status).toBe(400);
            });
        });

        describe("가게 구독 리스트", () => {
            test("해당 가게의 모든 구독 정보를 갖고 와야함", async () => {
                const response = await request(app).get("/v0/shops/1/subscriptions");
                expect(response.status).toBe(200);
            });

            test("잘못된 Parameter로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/shops/asdf/subscriptions");
                expect(response.status).toBe(400);
            });
        });

        describe("가게 주문 리스트", () => {
            test("해당 가게의 모든 주문 정보를 갖고 와야함", async () => {
                const response = await request(app).get("/v0/shops/1/orders");
                expect(response.status).toBe(200);
            });

            test("잘못된 Parameter로 400 오류가 나야함", async () => {
                const response = await request(app).get("/v0/shops/asdf/orders");
                expect(response.status).toBe(400);
            });
        });
    });
});
