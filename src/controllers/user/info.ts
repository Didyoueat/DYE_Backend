import { Request, Response, NextFunction } from "express";
import * as userService from "@services/user.service";

// 회원 정보 조회
export const getUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);

    return await userService.findUser(userId);
};

// 회원 생성
export const createUser = async (req: Request, res: Response) => {
    return await userService.createUser(req.body);
};

// 회원 정보 수정
export const updateUser = (req: Request, res: Response) => {};

// 회원 탈퇴
export const deleteUser = (req: Request, res: Response) => {};
