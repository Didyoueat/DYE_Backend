import { Request, Response, NextFunction } from "express";
import * as subsService from "@services/subs.service";

// 회원 구독 목록 조회
export const getUserSubsList = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    const weekLabel = req.query.weekLabel ? parseInt(String(req.query.weekLabel), 10) : undefined;

    return await subsService.findUserSubs(userId, weekLabel);
};

// 회원 구독 요일 별 조회
export const getUserSubsDetail = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsDayId: number = parseInt(req.params.subscriptionDayId, 10);

    return await subsService.findUserSubsDay(userId, subsDayId);
};

// 회원 구독 신청
export const createUserSubs = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);

    await subsService.createSubs(userId, req.body);

    return {};
};

// 회원 구독 정보 수정
export const updateUserSubs = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);

    await subsService.updateSubs(userId, req.body);

    return {};
};

// 회원 구독 취소
export const deleteUserSubs = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);

    await subsService.deleteSubs(userId);

    return {};
};
