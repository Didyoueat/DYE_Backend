import { Request, Response, NextFunction } from "express";
import { findAllSubs } from "@services/subs.service";
import { findAllOrder } from "@services/order.service";

// 전체 회원 조회
export const getAllUserList = (req: Request, res: Response) => {};

// 전체 회원 구독 목록 조회
export const getAllUserSubsList = async (req: Request, res: Response) => {
    req.body.json = await findAllSubs();
};

// 전체 회원 주문 목록 조회
export const getAllUserOrderList = async (req: Request, res: Response) => {
    req.body.json = await findAllOrder();
};
