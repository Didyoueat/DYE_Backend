import { Request, Response, NextFunction } from "express";
import * as authService from "@services/auth.service";

// 카카오 Login API를 통한 로그인
export const kakaoLogin = async (req: Request, res: Response) => {
    const kakaoToken = req.body.kakao_token;
    const user = await authService.accessKakaoInfo(kakaoToken);

    req.body.requestId = user.userId;
    req.body.changedRequire = true;
    req.body.group = 0;

    return user;
};

// 사장님 로그인 API
export const shopLogin = async (req: Request, res: Response) => {
    const businessNumber: string = req.body.businessNumber;
    const password: string = req.body.password;
};

// 로그아웃
export const signOut = async (req: Request, res: Response) => {
    await authService.signOut(req.body.requestId, req.body.group);

    res.json({}).status(200);
};
