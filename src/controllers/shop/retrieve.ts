import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";
import * as shopService from "@services/shopService";
import * as subsService from "@services/subsService";

/**
 * 전체 가게 목록 조회
 */
export const getAllShopList = catchAsync(async (req: Request, res: Response) => {
    const body = await shopService.findAllShop();

    res.json(body).status(200);
});

/**
 * 동네 가게 목록 조회
 */
export const getAroundShopList = catchAsync(async (req: Request, res: Response) => {
    const lat: number = parseFloat(String(req.query.latitude));
    const lon: number = parseFloat(String(req.query.longitude));
    const radius: number = parseInt(String(req.query.radius), 10);
    const body = await shopService.findAroundShop(lat, lon, radius);

    res.json(body).status(200);
});

// 가게 구독 목록 조회
export const getShopSubsList = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const body = await subsService.findShopSubs(shopId);

    res.json(body).status(200);
});
