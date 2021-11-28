import path from "path";
import dotenv from "dotenv";

const { NODE_ENV } = process.env;

if (NODE_ENV === "production") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.prod") });
} else if (NODE_ENV === "development") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.dev") });
} else if (NODE_ENV === "test") {
    dotenv.config({ path: path.resolve(__dirname, "/.env.test") });
} else {
    throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.");
}

const env = {
    port: parseInt(process.env.PORT, 10) || 5000,
    nodeEnv: process.env.NODE_ENV,
    dbConfig: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
    },
};

export default env;
