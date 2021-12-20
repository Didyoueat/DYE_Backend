import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";
import * as orderService from "@services/orderService";

// 회원 주문 목록 조회
export const getUserOrderList = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const body = await orderService.findUserOrder(userId);

    res.json(body).status(200);
});

// 회원 주문 상세 조회
export const getUserOrderDetail = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const orderId: number = parseInt(req.params.orderId, 10);
    const body = await orderService.findOneOrder(userId, orderId);

    res.json(body).status(200);
});

// 회원 주문 수정 (왜 필요할까?)
export const updateUserOrder = catchAsync((req: Request, res: Response) => {});

// 회원 주문 삭제
export const deleteUserOrder = catchAsync(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const orderId: number = parseInt(req.params.orderId, 10);

    await orderService.deleteOrder(userId, orderId);

    res.json({}).status(200);
});
