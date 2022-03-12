import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import appDir from "app-root-path";

import * as authRouter from "@routes/auth";
import * as userRouter from "@routes/user";
import * as adminRouter from "@routes/admin";
import * as shopRouter from "@routes/shop";

const swaggerSpec = YAML.load(appDir.path + "/src/swagger/openapi.yaml");

export const path: string = "/v0";
export const router: Router = Router();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use(authRouter.path, authRouter.router);
router.use(userRouter.path, userRouter.router);
router.use(adminRouter.path, adminRouter.router);
router.use(shopRouter.path, shopRouter.router);
