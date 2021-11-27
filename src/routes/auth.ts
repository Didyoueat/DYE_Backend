import { Router } from "express";
import * as token from "@controllers/auth/token";
import * as phone from "@controllers/auth/phone";

export const path: string = "/auth";
export const router: Router = Router();

// 로그인 관련 API
router.post("/token", token.checkToken);
router.post("/token/sign", token.createToken);
router.delete("/token/sign", token.deleteToken);

// 카카오 회원 검증 API
router.post("/token/sign/kakao", token.checkKakaoToken);

// 휴대폰 인증 API
router.post("/phone", phone.sendAuthCode);
router.post("/phone/code", phone.checkAuthCode);
