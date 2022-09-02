import { Request, Response, NextFunction } from "express";
import * as shopPostService from "@services/shop.service";

// 가게 공지사항 목록 조회
export const getAllShopPosts = (req: Request, res: Response) => {
    return shopPostService.findAllShopPosts();
};

// 가게 공지사항 상세 조회
export const getShopPosts = (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    return shopPostService.findShopPosts(shopId);
};

export const getOnePost = (req: Request, res: Response) => {
    const shopPostId: number = parseInt(req.params.shopPostId, 10);

    return shopPostService.findOnePost(shopPostId);
};

// 가게 공지사항 등록
export const createShopPost = (req: Request, res: Response) => {
    const shopId: number = parseInt(req.params.shopId, 10);

    return shopPostService.createShopPost(shopId, req.body);
};

// 가게 공지사항 수정
export const updateShopPost = (req: Request, res: Response) => {
    const shopPostId: number = parseInt(req.params.shopPostId, 10);

    return shopPostService.updateShopPost(shopPostId, req.body);
};

// 가게 공지사항 삭제
export const deleteShopPost = (req: Request, res: Response) => {
    const shopPostId: number = parseInt(req.params.shopPostId, 10);

    return shopPostService.deleteShopPost(req.body);
};
