import { SubsRepo } from "@repository/subscription.repository";
import { SubsDishRepo } from "@repository/subscription.dish.repository";
import { DishRepo } from "@repository/dish.repository";
import { repository, addProperty, propertyCheck } from "@modules/property";
import tableCheck from "@modules/table.check";
import infoTypes from "infoTypes";

export const findAllSubs = async () => {
    const subsRepo = repository(SubsRepo);
    const shopSubs = await subsRepo.findAllUserSubs();

    return {
        subsCount: shopSubs.length,
        subscriptions: shopSubs,
    };
};

export const findShopSubs = async (shopId: number) => {
    propertyCheck(shopId);

    const subsRepo = repository(SubsRepo);
    const shopSubs = await subsRepo.findShopSubs(shopId);

    return {
        subsCount: shopSubs.length,
        subscriptions: shopSubs,
    };
};

export const findUserSubs = async (userId: number) => {
    propertyCheck(userId);

    const subsRepo = repository(SubsRepo);

    return await subsRepo.findUserSubs(userId);
};

export const findOneSubs = async (shopId: number, subsId: number) => {
    propertyCheck(shopId, subsId);

    const subsRepo = repository(SubsRepo);

    return await subsRepo.findOneSubs(shopId, subsId);
};

export const createSubs = async (userId: number, data: infoTypes.subscription) => {
    propertyCheck(userId, data);
    await tableCheck({ user: userId, shop: data.shopId, dish: data.dishes.map((value) => value.dishId) });

    const { createSubs } = repository(SubsRepo);
    const { createSubsDish } = repository(SubsDishRepo);
    const { findOneDish } = repository(DishRepo);

    const subs = await createSubs(userId, data);

    data.dishes.map(async (value: infoTypes.subscriptionDish) => {
        const dish = await findOneDish(data.shopId, value.dishId);

        await createSubsDish(subs.raw.insertId, dish, value.orderCount);
    });
};

export const updateSubsInfo = async (userId: number, subsId: number, data: infoTypes.subscription) => {
    propertyCheck(userId, subsId, addProperty(data, "subscription"));

    const subsRepo = repository(SubsRepo);

    await subsRepo.updateSubsInfo(userId, subsId, data);
};

export const updateSubsDish = async (userId: number, subsId: number, data: infoTypes.changeDish) => {
    propertyCheck(userId, subsId, data);

    const subsRepo = repository(SubsRepo);

    // await subsRepo.updateSubsDish(userId, subsId, data);
};

export const updateSubsDishOnetime = async (userId: number, subsId: number, data: infoTypes.changeDish) => {
    propertyCheck(userId, subsId, data);

    const subsRepo = repository(SubsRepo);

    // await subsRepo.updateSubsDishOnetime(userId, subsId, data);
};

export const deleteSubs = async (userId: number, subsId: number) => {
    propertyCheck(userId, subsId);

    const subsRepo = repository(SubsRepo);

    await subsRepo.deleteSubs(userId, subsId);
};
