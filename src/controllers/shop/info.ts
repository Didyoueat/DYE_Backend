import { Request, Response, NextFunction } from "express";
import * as shopService from "@services/shopService";

// 가게 정보 조회
export const getShop = async (req: Request, res: Response) => {
    const body = await shopService.shopInfo(parseInt(req.params.shopId, 10));
    if (body === null) res.send("잘못된 요청입니다.").status(400);
    else res.json(body).status(200);
};

// 가게 생성
export const createShop = (req: Request, res: Response) => {};

// 가게 정보 수정
export const updateShop = (req: Request, res: Response) => {};

// 가게 탈퇴
export const deleteUser = (req: Request, res: Response) => {};
