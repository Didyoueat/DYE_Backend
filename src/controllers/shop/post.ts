import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@middlewares/error";

// 가게 공지사항 목록 조회
export const getShopPostList = catchAsync((req: Request, res: Response) => {});

// 가게 공지사항 상세 조회
export const getShopPostDetail = catchAsync((req: Request, res: Response) => {});

// 가게 공지사항 등록
export const createShopPost = catchAsync((req: Request, res: Response) => {});

// 가게 공지사항 수정
export const updateShopPost = catchAsync((req: Request, res: Response) => {});

// 가게 공지사항 삭제
export const deleteShopPost = catchAsync((req: Request, res: Response) => {});
