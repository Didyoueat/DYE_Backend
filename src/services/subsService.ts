import ApiError from "@modules/apiError";
import httpStatus from "http-status";
import { infoTypes } from "infoTypes";
import { repository, shopPropertyCheck, shopTypeCheck } from "@modules/property";
import { SubsRepo } from "@repository/subsRepo";

export const findShopSubs = async (shopId: number) => {
    if (isNaN(shopId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const subsRepo = repository(SubsRepo);
    const shopSubs = await subsRepo.findShopSubs(shopId);

    return {
        subsCount: shopSubs.length,
        subscriptions: shopSubs, // user 정보 수정 필요
    };
};
