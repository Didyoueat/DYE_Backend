import { Request, Response, NextFunction } from "express";
import * as shopService from "@services/shopService";

/**
 * 전체 가게 목록 조회
 */
export const getAllShopList = (req: Request, res: Response) => {};

/**
 * 동네 가게 목록 조회
 */
export const getAroundShopList = async (req: Request, res: Response) => {
    const lat: number = parseFloat(String(req.query.latitude));
    const lon: number = parseFloat(String(req.query.longitude));
    const radius: number = parseInt(String(req.query.radius), 10);

    if (isNaN(lat) || isNaN(lon) || isNaN(radius)) res.send("잘못된 요청입니다.").status(400);
    else {
        const body = await shopService.aroundShop(lat, lon, radius);
        if (body !== null) res.json(body).status(200);
        else res.send("API Server Error").status(500);
    }
};

// 가게 구독 목록 조회
export const getShopSubsList = (req: Request, res: Response) => {};
