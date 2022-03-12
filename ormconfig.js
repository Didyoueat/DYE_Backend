const path = require("path");
const appDir = require("app-root-path").path;

const { NODE_ENV } = process.env;

if (NODE_ENV === "production") {
    require("dotenv").config({ path: path.join(appDir, "/.env.prod") });
} else if (NODE_ENV === "development") {
    require("dotenv").config({ path: path.join(appDir, "/.env.dev") });
} else if (NODE_ENV === "test") {
    require("dotenv").config({ path: path.join(appDir, "/.env.test") });
} else {
    throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.");
}

module.exports = {
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: "utf8mb4_general_ci",
    timezone: "+09:00",
    synchronize: false,
    logging: ["error"],
    logger: "file",
    maxQueryExecutionTime: 2000,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
    cli: {
        entitiesDir: "src/entities",
        migrationsDir: "src/migrations",
        subscribersDir: "src/subscribers",
    },
};
