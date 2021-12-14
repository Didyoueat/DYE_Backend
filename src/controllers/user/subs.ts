import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@modules/error";

// 회원 구독 목록 조회
export const getUserSubsList = catchAsync((req: Request, res: Response) => {});

// 회원 구독 상세 조회
export const getUserSubsDetail = catchAsync((req: Request, res: Response) => {});

// 회원 구독 신청
export const createUserSubs = catchAsync((req: Request, res: Response) => {});

// 회원 구독 정보 수정
export const updateUserSubs = catchAsync((req: Request, res: Response) => {});

// 회원 구독 반찬 수정
export const updateUserSubsDishes = catchAsync((req: Request, res: Response) => {});

// 회원 구독 반찬 이번만 수정
export const updateUserSubsOnetime = catchAsync((req: Request, res: Response) => {});

// 회원 구독 취소
export const deleteUserSubs = catchAsync((req: Request, res: Response) => {});
