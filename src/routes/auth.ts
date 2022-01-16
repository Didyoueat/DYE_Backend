import { Router } from "express";
import * as token from "@controllers/auth/token";
import * as phone from "@controllers/auth/phone";

import afterware from "@middlewares/afterware";

export const path: string = "/auth";
export const router: Router = Router();

// 로그인 관련 API
router.post("/token", afterware(token.checkToken));
router.post("/token/sign", afterware(token.createToken));
router.delete("/token/sign", afterware(token.deleteToken));

// 카카오 회원 검증 API
router.post("/token/sign/kakao", afterware(token.checkKakaoToken));

// 휴대폰 인증 API
router.post("/phone", afterware(phone.sendAuthCode));
router.post("/phone/code", afterware(phone.checkAuthCode));
