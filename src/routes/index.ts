import { Router } from "express";

import * as authRouter from "@routes/auth";
import * as userRouter from "@routes/user";
import * as adminRouter from "@routes/admin";
import * as shopRouter from "@routes/shop";

export const path: string = "/v0";
export const router: Router = Router();

router.use(authRouter.path, authRouter.router);
router.use(userRouter.path, userRouter.router);
router.use(adminRouter.path, adminRouter.router);
router.use(shopRouter.path, shopRouter.router);
