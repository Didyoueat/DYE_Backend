import { Router } from "express";
import * as info from "@controllers/shop/info";
import * as dish from "@controllers/shop/dish";
import * as post from "@controllers/shop/post";
import * as order from "@controllers/shop/order";
import * as retrieve from "@controllers/shop/retrieve";

// import catchPrivilege from "@middlewares/privilege";
import afterware from "@middlewares/afterware";
import authorization from "@middlewares/authorization";

export const path: string = "/shops";
export const router: Router = Router();

// 전체 가게 조회 API
router.get("/", authorization, afterware(retrieve.getAllShopList));

// 동네 가게 조회 API
router.get("/around", afterware(retrieve.getAroundShopList));

// 가게 구독 조회 API
router.get("/:shopId/subscriptions", afterware(retrieve.getShopSubsList));

// 가게 주문 목록 조회 API
router.get("/:shopId/orders", afterware(order.getShopOrderList));

// 가게 정보 관련 API
router.get("/:shopId", authorization, afterware(info.getShop));
router.post("/create", afterware(info.createShop));
router.patch("/:shopId", afterware(info.updateShop));
router.delete("/:shopId", afterware(info.deleteUser));

// 가게 반찬 관련 API
router.get("/:shopId/dishes", afterware(dish.getShopDishList));
router.get("/:shopId/dishes/:dishId", afterware(dish.getShopDishDetail));
router.post("/:shopId/dishes/create", afterware(dish.createShopDish));
router.patch("/:shopId/dishes/:dishId", afterware(dish.updateShopDish));
router.delete("/:shopId/dishes/:dishId", afterware(dish.deleteShopDish));

// 가게 공지사항 관련 API
router.get("/:shopId/posts", afterware(post.getShopPostList));
router.get("/:shopId/posts/:postId", afterware(post.getShopPostDetail));
router.post("/:shopId/posts/create", afterware(post.createShopPost));
router.patch("/:shopId/posts/:postId", afterware(post.updateShopPost));
router.delete("/:shopId/posts/:postId", afterware(post.deleteShopPost));
