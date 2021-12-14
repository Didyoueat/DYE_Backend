import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 휴대폰 인증번호 전달
export const sendAuthCode = catchAsync((req: Request, res: Response) => {});

// 휴대폰 인증번호 확인
export const checkAuthCode = catchAsync((req: Request, res: Response) => {});
