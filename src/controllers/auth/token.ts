import { Request, Response, NextFunction } from "express";

// JWT 검증 (사용자 확인)
export const checkToken = (req: Request, res: Response) => {};

// JWT 발급 (로그인)
export const createToken = (req: Request, res: Response) => {};

// JWT 삭제 (로그아웃)
export const deleteToken = (req: Request, res: Response) => {};

// 카카오 Login API를 통한 신규/기존 사용자 확인
export const checkKakaoToken = (req: Request, res: Response) => {};
