import { Request, Response, NextFunction } from "express";

// 회원 구독 목록 조회
export const getUserSubsList = (req: Request, res: Response) => {};

// 회원 구독 상세 조회
export const getUserSubsDetail = (req: Request, res: Response) => {};

// 회원 구독 신청
export const createUserSubs = (req: Request, res: Response) => {};

// 회원 구독 수정
export const updateUserSubs = (req: Request, res: Response) => {};

// 회원 구독 이번만 수정
export const updateUserSubsOneTime = (req: Request, res: Response) => {};

// 회원 구독 취소
export const deleteUserSubs = (req: Request, res: Response) => {};