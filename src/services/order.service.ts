import { OrderRepo } from "@repository/order.repository";
import { repository, propertyCheck } from "@modules/property";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import infoTypes from "infoTypes";
import { findUserSubs } from "./subs.service";

export const findAllOrder = async () => {
    const orderRepo = repository(OrderRepo);
    const allOrder = await orderRepo.findAllOrders();

    if (!allOrder || allOrder.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return allOrder;
};

export const findShopOrder = async (shopId: number) => {
    propertyCheck(shopId);

    const orderRepo = repository(OrderRepo);
    const shopOrder = await orderRepo.findShopOrders(shopId);

    if (!shopOrder || shopOrder.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return shopOrder;
};

export const findUserOrder = async (userId: number) => {
    propertyCheck(userId);

    const orderRepo = repository(OrderRepo);
    const userOrder = await orderRepo.findUserOrders(userId);

    if (!userOrder || userOrder.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return userOrder;
};

export const findOneOrder = async (userId: number, orderId: number) => {
    propertyCheck(userId, orderId);

    const orderRepo = repository(OrderRepo);
    const order = await orderRepo.findOrder(userId, orderId);

    if (!order) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return order;
};

// export const createOrder = async (userId: number, orderState: string, paymentState: string) => {
//     propertyCheck(userId);

//     const subs = findUserSubs(userId, undefined);
// };

export const deleteOrder = async (userId: number, orderId: number) => {
    propertyCheck(userId, orderId);

    const orderRepo = repository(OrderRepo);

    if ((await orderRepo.deleteOrder(userId, orderId)).affected !== 1) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};
