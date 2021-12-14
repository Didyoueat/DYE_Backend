import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// JWT 검증 (사용자 확인)
export const checkToken = catchAsync((req: Request, res: Response) => {});

// JWT 발급 (로그인)
export const createToken = catchAsync((req: Request, res: Response) => {});

// JWT 삭제 (로그아웃)
export const deleteToken = catchAsync((req: Request, res: Response) => {});

// 카카오 Login API를 통한 신규/기존 사용자 확인
export const checkKakaoToken = catchAsync((req: Request, res: Response) => {});
