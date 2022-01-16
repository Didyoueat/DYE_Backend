import { Request, Response, NextFunction } from "express";
import * as authService from "@services/auth.service";

// JWT 검증 (사용자 확인)
export const checkToken = (req: Request, res: Response) => {
    const access = String(req.headers.access_token);
    const refresh = String(req.headers.refresh_token);
    const userId = req.body.userId;

    return authService.verityToken(access, refresh, userId);
};

// JWT 발급 (로그인)
export const createToken = async (req: Request, res: Response) => {
    const userId = parseInt(req.body.userId, 10);
    return await authService.createToken(userId);
};

// JWT 삭제 (로그아웃)
export const deleteToken = (req: Request, res: Response) => {};

// 카카오 Login API를 통한 신규/기존 사용자 확인
export const checkKakaoToken = async (req: Request, res: Response) => {
    const kakaoToken = req.body.kakaoToken;
    req.body.json = await authService.accessKakaoInfo(kakaoToken);
};
