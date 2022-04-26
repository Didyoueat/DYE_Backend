import { Router } from "express";
import * as info from "@controllers/user/info";
import * as subs from "@controllers/user/subs";
import * as order from "@controllers/user/order";
import * as retrieve from "@controllers/user/overall";

import afterware from "@middlewares/afterware";
import catchPrivilege from "@middlewares/privilege";
import authorization from "@middlewares/authorization";

export const path: string = "/users";
export const router: Router = Router();

// 전체 회원 조회 API
router.get("/", catchPrivilege(authorization), afterware(retrieve.getAllUserList));

// 전체 회원 구독 목록 조회 API
router.get("/subscriptions", catchPrivilege(authorization), afterware(retrieve.getAllUserSubsList));

// 전체 회원 주문 목록 조회 API
router.get("/orders", catchPrivilege(authorization), afterware(retrieve.getAllUserOrderList));

// 회원 정보 관련 API *** 수정 필요 ***
router.post("/create", afterware(info.createUser));
router.get("/:userId", afterware(info.getUser));
router.patch("/:userId", afterware(info.updateUser));
router.delete("/:userId", afterware(info.deleteUser));

// 회원 구독 관련 API
router.post("/:userId/subscriptions/create", catchPrivilege(authorization, { user: true }), afterware(subs.createUserSubs));
router.get("/:userId/subscriptions", catchPrivilege(authorization, { user: true }), afterware(subs.getUserSubsList));
router.get(
    "/:userId/subscriptions/:subscriptionDayId",
    catchPrivilege(authorization, { all: true }),
    afterware(subs.getUserSubsDetail)
);
router.put("/:userId/subscriptions", catchPrivilege(authorization, { user: true }), afterware(subs.updateUserSubs));
router.delete("/:userId/subscriptions", catchPrivilege(authorization, { user: true }), afterware(subs.deleteUserSubs));
// router.put("/:userId/subscriptions/:subscriptionId/dishes", afterware(subs.updateUserSubsDishes));
// router.put("/:userId/subscriptions/:subscriptionId/onetime", afterware(subs.updateUserSubsOnetime));

// 회원 주문 관련 API
router.get("/:userId/orders", catchPrivilege(authorization, { user: true }), afterware(order.getUserOrderList));
router.get("/:userId/orders/:orderId", catchPrivilege(authorization, { user: true }), afterware(order.getUserOrderDetail));
router.patch("/:userId/orders/:orderId", catchPrivilege(authorization, { user: true }), afterware(order.updateUserOrder));
router.delete("/:userId/orders/:orderId", catchPrivilege(authorization, { user: true }), afterware(order.deleteUserOrder));
