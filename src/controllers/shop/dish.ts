import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 가게 반찬 목록 조회
export const getShopDishList = catchAsync((req: Request, res: Response) => {});

// 가게 반찬 상세 조회
export const getShopDishDetail = catchAsync((req: Request, res: Response) => {});

// 가게 반찬 등록
export const createShopDish = catchAsync((req: Request, res: Response) => {});

// 가게 반찬 수정
export const updateShopDish = catchAsync((req: Request, res: Response) => {});

// 가게 반찬 삭제
export const deleteShopDish = catchAsync((req: Request, res: Response) => {});
