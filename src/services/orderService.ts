import ApiError from "@modules/apiError";
import httpStatus from "http-status";
import { infoTypes } from "infoTypes";
import { repository, shopPropertyCheck, shopTypeCheck } from "@modules/property";
import { OrderRepo } from "@repository/orderRepo";

export const findShopOrder = async (shopId: number) => {
    if (isNaN(shopId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const orderRepo = repository(OrderRepo);
    const shopOrder = await orderRepo.findShopOrder(shopId);

    return {
        subsCount: shopOrder.length,
        subscriptions: shopOrder,
    };
};
