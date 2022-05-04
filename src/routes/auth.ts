import { Router } from "express";
import * as token from "@controllers/auth/token";
import * as sign from "@controllers/auth/sign";

import terminus from "@middlewares/terminus";
import catchPrivilege from "@middlewares/privilege";
import authorization from "@middlewares/authorization";

export const path: string = "/auth";
export const router: Router = Router();

// 로그인 관련 API
router.post("/sign/kakao", terminus(sign.kakaoLogin));
router.post("/sign/shop", terminus(sign.shopLogin));
router.post("/sign", terminus(token.createToken));
router.get("/sign", terminus(authorization));
router.delete("/sign", catchPrivilege(authorization, { user: true, shop: true }), sign.signOut);
