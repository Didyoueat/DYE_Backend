import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createConnection } from "typeorm";

import env from "@modules/env";
import * as apiRouter from "@routes/index";

const app = express();
const port = env.port || 5000;

const corsOptions = {
    origin: "*",
    credentials: true,
};

createConnection()
    .then(() => console.log("🚀 DB Connected"))
    .catch((err) => console.log(err));

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter.path, apiRouter.router);

app.listen(port, () => {
    console.log(`PORT ${port} is running ...`);
});

export default app;
