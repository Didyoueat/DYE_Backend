import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@middlewares/error";
import * as dishService from "@services/dish.service";

// 가게 반찬 목록 조회
export const getShopDishList = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const body = await dishService.findShopDishes(shopId);

    res.json(body).status(200);
});

// 가게 반찬 상세 조회
export const getShopDishDetail = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const dishId: number = parseInt(req.params.dishId, 10);
    const body = await dishService.findShopDish(shopId, dishId);

    res.json(body).status(200);
});

// 가게 반찬 등록
export const createShopDish = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    await dishService.createDish(shopId, req.body);
    res.json({}).status(200);
});

// 가게 반찬 수정
export const updateShopDish = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const dishId: number = parseInt(req.params.dishId, 10);

    await dishService.updateDish(shopId, dishId, req.body);
    res.json({}).status(200);
});

// 가게 반찬 삭제
export const deleteShopDish = catchAsync(async (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);
    const dishId: number = parseInt(req.params.dishId, 10);

    await dishService.deleteDish(shopId, dishId);
    res.json({}).status(200);
});
