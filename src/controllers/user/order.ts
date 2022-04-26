import { Request, Response, NextFunction } from "express";
import * as orderService from "@services/order.service";

// 회원 주문 목록 조회
export const getUserOrderList = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);

    return await orderService.findUserOrder(userId);
};

// 회원 주문 상세 조회
export const getUserOrderDetail = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const orderId: number = parseInt(req.params.orderId, 10);

    return await orderService.findOneOrder(userId, orderId);
};

// 회원 주문 수정 (왜 필요할까?)
export const updateUserOrder = (req: Request, res: Response) => {};

// 회원 주문 삭제
export const deleteUserOrder = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const orderId: number = parseInt(req.params.orderId, 10);

    await orderService.deleteOrder(userId, orderId);

    return {};
};
