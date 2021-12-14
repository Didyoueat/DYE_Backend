import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 회원 주문 목록 조회
export const getUserOrderList = catchAsync((req: Request, res: Response) => {});

// 회원 주문 상세 조회
export const getUserOrderDetail = catchAsync((req: Request, res: Response) => {});

// 회원 주문 수정
export const updateUserOrder = catchAsync((req: Request, res: Response) => {});

// 회원 주문 삭제
export const deleteUserOrder = catchAsync((req: Request, res: Response) => {});
