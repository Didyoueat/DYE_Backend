import { Router } from "express";
import * as info from "@controllers/user/info";
import * as subs from "@controllers/user/subs";
import * as order from "@controllers/user/order";
import * as retrieve from "@controllers/user/retrieve";

import afterware from "@middlewares/afterware";

export const path: string = "/users";
export const router: Router = Router();

// 전체 회원 조회 API
router.get("/", afterware(retrieve.getAllUserList));

// 전체 회원 구독 목록 조회 API
router.get("/subscriptions", afterware(retrieve.getAllUserSubsList));

// 전체 회원 주문 목록 조회 API
router.get("/orders", afterware(retrieve.getAllUserOrderList));

// 회원 정보 관련 API
router.get("/:userId", afterware(info.getUser));
router.post("/create", afterware(info.createUser));
router.patch("/:userId", afterware(info.updateUser));
router.delete("/:userId", afterware(info.deleteUser));

// 회원 구독 관련 API
router.get("/:userId/subscriptions", afterware(subs.getUserSubsList));
router.get("/:userId/subscriptions/:subscriptionId", afterware(subs.getUserSubsDetail));
router.post("/:userId/subscriptions/create", afterware(subs.createUserSubs));
router.patch("/:userId/subscriptions/:subscriptionId", afterware(subs.updateUserSubs));
router.put("/:userId/subscriptions/:subscriptionId/dishes", afterware(subs.updateUserSubsDishes));
router.put("/:userId/subscriptions/:subscriptionId/onetime", afterware(subs.updateUserSubsOnetime));
router.delete("/:userId/subscriptions/:subscriptionId", afterware(subs.deleteUserSubs));

// 회원 주문 관련 API
router.get("/:userId/orders", afterware(order.getUserOrderList));
router.get("/:userId/orders/:orderId", afterware(order.getUserOrderDetail));
router.patch("/:userId/orders/:orderId", afterware(order.updateUserOrder));
router.delete("/:userId/orders/:orderId", afterware(order.deleteUserOrder));
