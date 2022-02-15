import { Router } from "express";
import * as info from "@controllers/shop/info";
import * as dish from "@controllers/shop/dish";
import * as post from "@controllers/shop/post";
import * as order from "@controllers/shop/order";
import * as retrieve from "@controllers/shop/overall";

// import catchPrivilege from "@middlewares/privilege";
import afterware from "@middlewares/afterware";
import authorization from "@middlewares/authorization";
import catchPrivilege from "@middlewares/privilege";

export const path: string = "/shops";
export const router: Router = Router();

// 전체 가게 조회 API
router.get("/", catchPrivilege(authorization), afterware(retrieve.getAllShopList));

// 동네 가게 조회 API
router.get("/around", catchPrivilege(authorization, { user: true }), afterware(retrieve.getAroundShopList));

// 가게 구독 조회 API
router.get("/:shopId/subscriptions", catchPrivilege(authorization, { shop: true }), afterware(retrieve.getShopSubsList));

// 가게 주문 목록 조회 API
router.get("/:shopId/orders", catchPrivilege(authorization, { shop: true }), afterware(order.getShopOrderList));

// 가게 정보 관련 API
router.post("/create", catchPrivilege(authorization), afterware(info.createShop));
router.get("/:shopId", catchPrivilege(authorization, { all: true }), afterware(info.getShop));
router.patch("/:shopId", catchPrivilege(authorization, { shop: true }), afterware(info.updateShop));
router.delete("/:shopId", catchPrivilege(authorization), afterware(info.deleteUser));

// 가게 반찬 관련 API
router.post("/:shopId/dishes/create", catchPrivilege(authorization, { shop: true }), afterware(dish.createShopDish));
router.get("/:shopId/dishes", catchPrivilege(authorization, { all: true }), afterware(dish.getShopDishList));
router.get("/:shopId/dishes/:dishId", catchPrivilege(authorization, { all: true }), afterware(dish.getShopDishDetail));
router.put("/:shopId/dishes/:dishId", catchPrivilege(authorization, { shop: true }), afterware(dish.updateShopDish));
// *** 가게 대표사진 등록 / 취소 ***
// router.patch("/:shopId/dishes/:dishId", )
router.delete("/:shopId/dishes/:dishId", catchPrivilege(authorization, { shop: true }), afterware(dish.deleteShopDish));

// 가게 공지사항 관련 API *** 수정 필요 ***
router.post("/:shopId/posts/create", afterware(post.createShopPost));
router.get("/:shopId/posts", afterware(post.getShopPostList));
router.get("/:shopId/posts/:postId", afterware(post.getShopPostDetail));
router.patch("/:shopId/posts/:postId", afterware(post.updateShopPost));
router.delete("/:shopId/posts/:postId", afterware(post.deleteShopPost));
