import { Request, Response, NextFunction } from "express";
import * as orderService from "@services/order.service";

// 가게 주문 목록 조회
export const getShopOrderList = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    return await orderService.findShopOrder(shopId);
};
