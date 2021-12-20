import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";
import { findAllSubs } from "@services/subsService";
import { findAllOrder } from "@services/orderService";

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
