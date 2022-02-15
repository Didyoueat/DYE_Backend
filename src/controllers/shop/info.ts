import { Request, Response, NextFunction } from "express";
import * as shopService from "@services/shop.service";

// 가게 정보 조회
export const getShop = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    return await shopService.findOneShop(shopId);
};

// 가게 생성
export const createShop = async (req: Request, res: Response) => {
    await shopService.createShop(req.body);

    return {};
};

// 가게 정보 수정
export const updateShop = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    await shopService.updateShop(shopId, req.body);

    return {};
};

// 가게 탈퇴
export const deleteUser = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    await shopService.deleteShop(shopId);

    return {};
};
