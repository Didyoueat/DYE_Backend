import { Request, Response, NextFunction } from "express";
import * as dishService from "@services/dish.service";

// 가게 반찬 목록 조회
export const getShopDishList = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    req.body.json = await dishService.findShopDishes(shopId);
};

// 가게 반찬 상세 조회
export const getShopDishDetail = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const dishId: number = parseInt(req.params.dishId, 10);
    req.body.json = await dishService.findShopDish(shopId, dishId);
};

// 가게 반찬 등록
export const createShopDish = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    await dishService.createDish(shopId, req.body);
    req.body.json = {};
};

// 가게 반찬 수정
export const updateShopDish = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const dishId: number = parseInt(req.params.dishId, 10);

    await dishService.updateDish(shopId, dishId, req.body);
    req.body.json = {};
};

// 가게 반찬 삭제
export const deleteShopDish = async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const dishId: number = parseInt(req.params.dishId, 10);

    await dishService.deleteDish(shopId, dishId);
    req.body.json = {};
};
