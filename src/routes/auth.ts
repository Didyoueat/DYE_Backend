import { Router } from "express";
import * as token from "@controllers/auth/token";
import * as sign from "@controllers/auth/sign";

import afterware from "@middlewares/afterware";
import catchPrivilege from "@middlewares/privilege";
import authorization from "@middlewares/authorization";

export const path: string = "/auth";
export const router: Router = Router();

// 로그인 관련 API
router.post("/sign/kakao", afterware(sign.kakaoLogin));
router.post("/sign/shop", afterware(sign.shopLogin));
router.post("/sign", afterware(token.createToken));
router.get("/sign", afterware(authorization));
router.delete("/sign", catchPrivilege(authorization, { user: true, shop: true }), sign.signOut);
