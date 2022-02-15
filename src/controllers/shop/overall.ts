import { Request, Response, NextFunction } from "express";
import * as shopService from "@services/shop.service";
import * as subsService from "@services/subs.service";

/**
 * 전체 가게 목록 조회
 */
export const getAllShopList = async (req: Request, res: Response) => {
    return await shopService.findAllShop();
};

/**
 * 동네 가게 목록 조회
 */
export const getAroundShopList = async (req: Request, res: Response) => {
    const lat: number = parseFloat(String(req.query.latitude));
    const lon: number = parseFloat(String(req.query.longitude));
    const radius: number = parseInt(String(req.query.radius), 10);

    return await shopService.findAroundShop(lat, lon, radius);
};

// 가게 구독 목록 조회
export const getShopSubsList = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    return await subsService.findShopSubs(shopId);
};
