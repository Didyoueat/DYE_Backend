import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";
import * as shopService from "@services/shopService";

// 가게 정보 조회
export const getShop = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const body = await shopService.shopInfo(shopId);

    if (body === undefined || isNaN(shopId)) res.send("잘못된 요청입니다.").status(400);
    else res.json(body).status(200);
});

// 가게 생성
export const createShop = catchAsync((req: Request, res: Response) => {});

// 가게 정보 수정
export const updateShop = catchAsync((req: Request, res: Response) => {});

// 가게 탈퇴
export const deleteUser = catchAsync((req: Request, res: Response) => {});
