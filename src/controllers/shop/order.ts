import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 가게 주문 목록 조회
export const getShopOrderList = catchAsync((req: Request, res: Response) => {});
