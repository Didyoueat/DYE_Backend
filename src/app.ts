import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createConnection } from "typeorm";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import appDir from "app-root-path";

import * as apiRouter from "@routes/index";

import dbLoader from "@modules/orm.config";
import env from "@modules/env";
import logger from "@modules/logger";
import { errorConverter, errorHandler, notFound } from "@middlewares/error";

const app = express();
const port = env.port || 5000;

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    method: ["POST", "GET", "PUT", "PATCH", "DELETE"],
};

const swaggerSpec = YAML.load(appDir.path + "/src/swagger/openapi.yaml");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(cors(corsOptions));
app.use(morgan("dev", { stream: logger.stream }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter.path, apiRouter.router);
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

if (env.nodeEnv !== "jest") {
    app.listen(port, async () => {
        console.log(`======= ENV: ${env.nodeEnv} =======`);
        console.log(`🚀 App listening on the port ${port}`);
        await dbLoader();
    });
}

export default app;
