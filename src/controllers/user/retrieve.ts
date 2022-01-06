import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@middlewares/error";
import { findAllSubs } from "@services/subs.service";
import { findAllOrder } from "@services/order.service";

// 전체 회원 조회
export const getAllUserList = catchAsync((req: Request, res: Response) => {});

// 전체 회원 구독 목록 조회
export const getAllUserSubsList = catchAsync(async (req: Request, res: Response) => {
    const body = await findAllSubs();

    res.json(body).status(200);
});

// 전체 회원 주문 목록 조회
export const getAllUserOrderList = catchAsync(async (req: Request, res: Response) => {
    const body = await findAllOrder();

    res.json(body).status(200);
});
