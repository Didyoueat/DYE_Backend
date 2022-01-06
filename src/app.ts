import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createConnection } from "typeorm";

import * as apiRouter from "@routes/index";

import env from "@modules/env";
import logger from "@modules/logger";
import { errorConverter, errorHandler } from "@middlewares/error";

const app = express();
const port = env.port || 5000;

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev", { stream: logger.stream }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter.path, apiRouter.router);
app.use(errorConverter);
app.use(errorHandler);

if (env.nodeEnv !== "test") {
    app.listen(port, async () => {
        console.log(`======= ENV: ${env.nodeEnv} =======`);
        console.log(`🚀 App listening on the port ${port}`);
        await createConnection()
            .then(() => console.log("🚀 DB Connected"))
            .catch((err) => console.log(err));
    });
}

export default app;
