import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@middlewares/error";
import * as shopService from "@services/shop.service";

// 가게 정보 조회
export const getShop = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const body = await shopService.findOneShop(shopId);

    res.json(body).status(200);
});

// 가게 생성
export const createShop = catchAsync(async (req: Request, res: Response) => {
    await shopService.createShop(req.body);
    res.json({}).status(200);
});

// 가게 정보 수정
export const updateShop = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    await shopService.updateShop(shopId, req.body);
    res.json({}).status(200);
});

// 가게 탈퇴
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    await shopService.deleteShop(shopId);
    res.json({}).status(200);
});
