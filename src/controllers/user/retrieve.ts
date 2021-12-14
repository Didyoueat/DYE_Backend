import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 전체 회원 조회
export const getAllUserList = catchAsync((req: Request, res: Response) => {});

// 전체 회원 구독 목록 조회
export const getAllUserSubsList = catchAsync((req: Request, res: Response) => {});

// 전체 회원 주문 목록 조회
export const getAllUserOrderList = catchAsync((req: Request, res: Response) => {});
