import { Request, Response, NextFunction } from "express";
import * as userService from "@services/userService";

// 회원 구독 목록 조회
export const getUserSubsList = (req: Request, res: Response) => {};

// 회원 구독 상세 조회
export const getUserSubsDetail = (req: Request, res: Response) => {};

// 회원 구독 신청
export const createUserSubs = (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const data: object = req.body;
    
    if (isNaN(userId) || Object.keys(data).length <= 0) res.send("잘못된 요청입니다.").status(400);

    const body = userService.createSubscription(userId, data);

    if (body === null) res.send("API Server Error").status(500);
    else res.send({}).status(200);
};

// 회원 구독 수정
export const updateUserSubs = (req: Request, res: Response) => {};

// 회원 구독 이번만 수정
export const updateUserSubsOneTime = (req: Request, res: Response) => {};

// 회원 구독 취소
export const deleteUserSubs = (req: Request, res: Response) => {};
