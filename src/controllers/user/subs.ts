import { Request, Response, NextFunction } from "express";
import * as subsService from "@services/subs.service";

// 회원 구독 목록 조회
export const getUserSubsList = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    req.body.json = await subsService.findUserSubs(userId);
};

// 회원 구독 상세 조회
export const getUserSubsDetail = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);
    req.body.json = await subsService.findOneSubs(userId, subsId);
};

// 회원 구독 신청
export const createUserSubs = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    req.body.json = await subsService.createSubs(userId, req.body);
};

// 회원 구독 정보 수정
export const updateUserSubs = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.updateSubsInfo(userId, subsId, req.body);
    req.body.json = {};
};

// 회원 구독 반찬 수정
export const updateUserSubsDishes = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.updateSubsDish(userId, subsId, req.body);
    req.body.json = {};
};

// 회원 구독 반찬 이번만 수정
export const updateUserSubsOnetime = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.updateSubsDishOnetime(userId, subsId, req.body);
    req.body.json = {};
};

// 회원 구독 취소
export const deleteUserSubs = async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.deleteSubs(userId, subsId);
    req.body.json = {};
};
