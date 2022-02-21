import path from "path";
import dotenv from "dotenv";

const { NODE_ENV } = process.env;

if (NODE_ENV === "production") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.prod") });
} else if (NODE_ENV === "development") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.dev") });
} else if (NODE_ENV === "test") {
    dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });
} else {
    throw new Error("process.env.NODE_ENV를 설정하지 않았습니다.");
}

const env = {
    port: parseInt(process.env.PORT, 10) || 5000,
    nodeEnv: process.env.NODE_ENV,
    slackWebhook: process.env.SLACK_WEBHOOK,
    jwtSecret: {
        access: process.env.JWT_ACCESS_SECRET,
        refresh: process.env.JWT_REFRESH_SECRET,
    },
    dbConfig: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
    },
    awsConfig: {
        accessKey: process.env.AWS_IAM_ACCESS_KEY,
        secretKey: process.env.AWS_IAM_SECRET_KEY,
        region: process.env.AWS_S3_REGION,
        bucket: process.env.AWS_S3_BUCKET,
        redisHost: process.env.REDIS_HOST,
        redisPort: process.env.REDIS_PORT,
    },
};

export default env;
