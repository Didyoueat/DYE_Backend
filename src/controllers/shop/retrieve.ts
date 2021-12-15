import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";
import * as shopService from "@services/shopService";

/**
 * 전체 가게 목록 조회
 */
export const getAllShopList = catchAsync((req: Request, res: Response) => {});

/**
 * 동네 가게 목록 조회
 */
export const getAroundShopList = catchAsync(async (req: Request, res: Response) => {
    const lat: number = parseFloat(String(req.query.latitude));
    const lon: number = parseFloat(String(req.query.longitude));
    const radius: number = parseInt(String(req.query.radius), 10);
    const body = await shopService.aroundShop(lat, lon, radius);

    res.json(body).status(200);
});

// 가게 구독 목록 조회
export const getShopSubsList = catchAsync((req: Request, res: Response) => {});
