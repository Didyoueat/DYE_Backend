import { OrderRepo } from "@repository/order.repository";
import { repository, propertyCheck } from "@modules/property";
import infoTypes from "infoTypes";

export const findAllOrder = async () => {
    const orderRepo = repository(OrderRepo);
    const allOrder = await orderRepo.findAllOrder();

    return {
        subsCount: allOrder.length,
        subscriptions: allOrder,
    };
};

export const findShopOrder = async (shopId: number) => {
    propertyCheck(shopId);

    const orderRepo = repository(OrderRepo);
    const shopOrder = await orderRepo.findShopOrder(shopId);

    return {
        subsCount: shopOrder.length,
        subscriptions: shopOrder,
    };
};

export const findUserOrder = async (userId: number) => {
    propertyCheck(userId);

    const orderRepo = repository(OrderRepo);
    const userOrder = await orderRepo.findUserOrder(userId);

    return {
        subsCount: userOrder.length,
        subscriptions: userOrder,
    };
};

export const findOneOrder = async (userId: number, orderId: number) => {
    propertyCheck(userId, orderId);

    const orderRepo = repository(OrderRepo);
    const shopOrder = await orderRepo.findOneOrder(userId, orderId);

    return shopOrder;
};

export const deleteOrder = async (userId: number, orderId: number) => {
    propertyCheck(userId, orderId);

    const orderRepo = repository(OrderRepo);

    await orderRepo.deleteOrder(userId, orderId);
};
