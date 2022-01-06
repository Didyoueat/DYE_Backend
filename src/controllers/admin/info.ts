import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@middlewares/error";

// 관리자 정보 조회
export const getAdmin = catchAsync((req: Request, res: Response) => {});

// 관리자 생성
export const createAdmin = catchAsync((req: Request, res: Response) => {});

// 관리자 수정
export const updateAdmin = catchAsync((req: Request, res: Response) => {});

// 관리자 삭제
export const deleteAdmin = catchAsync((req: Request, res: Response) => {});
