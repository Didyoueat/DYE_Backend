import request from "supertest";
import { createConnection } from "typeorm";
import app from "../../src/app";

beforeAll(async () => {
    await createConnection()
        .then(() => console.log("🚀 DB Connected"))
        .catch((err) => console.log(err));
});
