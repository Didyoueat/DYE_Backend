import { Router } from "express";
import * as info from "@controllers/user/info";
import * as subs from "@controllers/user/subs";
import * as order from "@controllers/user/order";
import * as retrieve from "@controllers/user/retrieve";

export const path: string = "/users";
export const router: Router = Router();

// 전체 회원 조회 API
router.get("/", retrieve.getAllUserList);

// 전체 회원 구독 목록 조회 API
router.get("/subscriptions", retrieve.getAllUserSubsList);

// 전체 회원 주문 목록 조회 API
router.get("/orders", retrieve.getAllUserOrderList);

// 회원 정보 관련 API
router.get("/:userId", info.getUser);
router.post("/create", info.createUser);
router.patch("/:userId", info.updateUser);
router.delete("/:userId", info.deleteUser);

// 회원 구독 관련 API
router.get("/:userId/subscriptions", subs.getUserSubsList);
router.get("/:userId/subscriptions/:subscriptionId", subs.getUserSubsDetail);
router.post("/:userId/subscriptions/create", subs.createUserSubs);
router.patch("/:userId/subscriptions/:subscriptionId", subs.updateUserSubs);
router.put("/:userId/subscriptions/:subscriptionId", subs.updateUserSubsOneTime);
router.delete("/:userId/subscriptions/:subscriptionId", subs.deleteUserSubs);

// 회원 주문 관련 API
router.get("/:userId/orders", order.getUserOrderList);
router.get("/:userId/orders/:orderId", order.getUserOrderDetail);
router.patch("/:userId/orders/:orderId", order.updateUserOrder);
router.delete("/:userId/orders/:orderId", order.deleteUserOrder);
