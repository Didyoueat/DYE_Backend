import { Request, Response, NextFunction } from "express";
import * as authService from "@services/auth.service";

// JWT 검증 (사용자 확인)
/**
 * 뭘 리턴해야 할 지
 * 성공 시 회원 정보, 실패시 오류?
 * @param req
 * @param res
 * @returns
 */
export const checkToken = (req: Request, res: Response) => {
    const access = String(req.headers.access_token);
    const refresh = String(req.headers.refresh_token);

    return authService.verityToken(access, refresh);
};

export const createToken = (req: Request, res: Response) => {
    const userId = parseInt(req.body.userId, 10);
    const group = parseInt(req.body.group, 10);

    req.body.requestId = userId;
    req.body.group = group;
    req.body.changedRequire = true;

    return {};
};
