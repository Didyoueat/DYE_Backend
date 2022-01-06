import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@middlewares/error";
import * as orderService from "@services/order.service";

// 가게 주문 목록 조회
export const getShopOrderList = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const body = await orderService.findShopOrder(shopId);

    res.json(body).status(200);
});
