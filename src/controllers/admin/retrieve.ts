import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 관리자 목록 조회
export const getAllAdminList = catchAsync((req: Request, res: Response) => {});
