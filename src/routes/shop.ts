import { Router } from "express";
import * as info from "@controllers/shop/info";
import * as dish from "@controllers/shop/dish";
import * as post from "@controllers/shop/post";
import * as order from "@controllers/shop/order";
import * as retrieve from "@controllers/shop/retrieve";

export const path: string = "/shops";
export const router: Router = Router();

// 전체 가게 조회 API
router.get("/", retrieve.getAllShopList);

// 동네 가게 조회 API
router.get("/around", retrieve.getAroundShopList);

// 가게 구독 조회 API
router.get("/:shopId/subscriptions", retrieve.getShopSubsList);

// 가게 주문 목록 조회 API
router.get("/:shopId/orders", order.getShopOrderList);

// 가게 정보 관련 API
router.get("/:shopId", info.getShop);
router.post("/create", info.createShop);
router.patch("/:shopId", info.updateShop);
router.delete("/:shopId", info.deleteUser);

// 가게 반찬 관련 API
router.get("/:shopId/dishes", dish.getShopDishList);
router.get("/:shopId/dishes/:dishId", dish.getShopDishDetail);
router.post("/:shopId/dishes/create", dish.createShopDish);
router.patch("/:shopId/dishes/:dishId", dish.updateShopDish);
router.delete("/:shopId/dishes/:dishId", dish.deleteShopDish);

// 가게 공지사항 관련 API
router.get("/:shopId/posts", post.getShopPostList);
router.get("/:shopId/posts/:postId", post.getShopPostDetail);
router.post("/:shopId/posts/create", post.createShopPost);
router.patch("/:shopId/posts/:postId", post.updateShopPost);
router.delete("/:shopId/posts/:postId", post.deleteShopPost);
