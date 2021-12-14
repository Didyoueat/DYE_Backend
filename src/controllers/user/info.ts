import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 회원 정보 조회
export const getUser = catchAsync((req: Request, res: Response) => {});

// 회원 생성
export const createUser = catchAsync((req: Request, res: Response) => {});

// 회원 정보 수정
export const updateUser = catchAsync((req: Request, res: Response) => {});

// 회원 탈퇴
export const deleteUser = catchAsync((req: Request, res: Response) => {});
