import * as express from "express";
import * as apiRouter from "@routes/index";
import * as morgan from "morgan";
import * as cookieParser from "cookie-parser";

const app: express.Application = express();

const port: number = Number(process.env.PORT) || 5000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter.path, apiRouter.router);

app.listen(port, () => {
    console.log(`PORT ${port} is running ...`);
});

export default app;
