import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@middlewares/error";
import * as subsService from "@services/subs.service";

// 회원 구독 목록 조회
export const getUserSubsList = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const body = await subsService.findUserSubs(userId);

    res.json(body).status(200);
});

// 회원 구독 상세 조회
export const getUserSubsDetail = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);
    const body = await subsService.findOneSubs(userId, subsId);

    res.json(body).status(200);
});

// 회원 구독 신청
export const createUserSubs = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);

    await subsService.createSubs(userId, req.body);
    res.json({}).status(200);
});

// 회원 구독 정보 수정
export const updateUserSubs = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.updateSubsInfo(userId, subsId, req.body);
    res.json({}).status(200);
});

// 회원 구독 반찬 수정
export const updateUserSubsDishes = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.updateSubsDish(userId, subsId, req.body);
    res.json({}).status(200);
});

// 회원 구독 반찬 이번만 수정
export const updateUserSubsOnetime = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.updateSubsDishOnetime(userId, subsId, req.body);
    res.json({}).status(200);
});

// 회원 구독 취소
export const deleteUserSubs = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const subsId: number = parseInt(req.params.subscriptionId, 10);

    await subsService.deleteSubs(userId, subsId);
    res.json({}).status(200);
});
