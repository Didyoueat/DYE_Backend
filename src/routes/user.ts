import { Router } from "express";
import * as info from "@controllers/user/info";
import * as subs from "@controllers/user/subs";
import * as order from "@controllers/user/order";
import * as retrieve from "@controllers/user/overall";

import terminus from "@middlewares/terminus";
import catchPrivilege from "@middlewares/privilege";
import authorization from "@middlewares/authorization";

export const path: string = "/users";
export const router: Router = Router();

// 전체 회원 조회 API
router.get("/", catchPrivilege(authorization), terminus(retrieve.getAllUserList));

// 전체 회원 구독 목록 조회 API
router.get("/subscriptions", catchPrivilege(authorization), terminus(retrieve.getAllUserSubsList));

// 전체 회원 주문 목록 조회 API
router.get("/orders", catchPrivilege(authorization), terminus(retrieve.getAllUserOrderList));

// 회원 정보 관련 API *** 수정 필요 ***
router.post("/create", terminus(info.createUser));
router.get("/:userId", terminus(info.getUser));
router.patch("/:userId", terminus(info.updateUser));
router.delete("/:userId", terminus(info.deleteUser));

// 회원 구독 관련 API
router.post("/:userId/subscriptions/create", catchPrivilege(authorization, { user: true }), terminus(subs.createUserSubs));
router.get("/:userId/subscriptions", catchPrivilege(authorization, { user: true }), terminus(subs.getUserSubsList));
router.get(
    "/:userId/subscriptions/:subscriptionDayId",
    catchPrivilege(authorization, { all: true }),
    terminus(subs.getUserSubsDetail)
);
router.put("/:userId/subscriptions", catchPrivilege(authorization, { user: true }), terminus(subs.updateUserSubs));
router.delete("/:userId/subscriptions", catchPrivilege(authorization, { user: true }), terminus(subs.deleteUserSubs));
// router.put("/:userId/subscriptions/:subscriptionId/dishes", terminus(subs.updateUserSubsDishes));
// router.put("/:userId/subscriptions/:subscriptionId/onetime", terminus(subs.updateUserSubsOnetime));

// 회원 주문 관련 API
router.get("/:userId/orders", catchPrivilege(authorization, { user: true }), terminus(order.getUserOrderList));
router.get("/:userId/orders/:orderId", catchPrivilege(authorization, { user: true }), terminus(order.getUserOrderDetail));
router.patch("/:userId/orders/:orderId", catchPrivilege(authorization, { user: true }), terminus(order.updateUserOrder));
router.delete("/:userId/orders/:orderId", catchPrivilege(authorization, { user: true }), terminus(order.deleteUserOrder));
