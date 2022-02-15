import { SubsRepo } from "@repository/subscription.repository";
import { SubsDishRepo } from "@repository/subscription.dish.repository";
import { DishRepo } from "@repository/dish.repository";
import { repository, propertyCheck } from "@modules/property";
import { dishCheck } from "@modules/table.check";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import infoTypes from "infoTypes";
import createTypes from "createTypes";
import { Subscriptions } from "@entities/subscriptions";

export const findAllSubs = async () => {
    const subsRepo = repository(SubsRepo);
    const allSubs = await subsRepo.findAllSubs();

    if (!allSubs || allSubs.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return allSubs;
};

export const findShopSubs = async (shopId: number) => {
    propertyCheck(shopId);

    const subsRepo = repository(SubsRepo);
    const shopSubs = await subsRepo.findShopSubs(shopId);

    if (!shopSubs || shopSubs.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return shopSubs;
};

export const findUserSubs = async (userId: number, weekLabel: number) => {
    propertyCheck(userId);

    const subsRepo = repository(SubsRepo);
    const userSubs = await subsRepo.findUserSubs(userId);

    if (userSubs && weekLabel) {
        const subs = userSubs.subscriptionDays.filter((day) => weekLabel & day.weekLabel);
        userSubs.subscriptionDays = subs;
    }

    if (!userSubs || userSubs.subscriptionDays.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return userSubs;
};

export const findUserSubsDay = async (userId: number, subsDayId: number) => {
    propertyCheck(userId, subsDayId);

    const subsRepo = repository(SubsRepo);

    return await subsRepo.findUserSubsDay(userId, subsDayId);
};

export const createSubs = async (userId: number, data: createTypes.subscription) => {
    propertyCheck(userId, { data: data, type: "subscription", mode: "create" });

    await Promise.all(
        data.subscriptionDays.map(async (day) => {
            await dishCheck(
                day.shopId,
                day.subscriptionDishes.map((dishData) => dishData.dishId)
            );
        })
    );

    const { createSubs, createSubsDay } = repository(SubsRepo);
    const { createSubsDish } = repository(SubsDishRepo);
    const { findDish } = repository(DishRepo);

    const subs = await createSubs(userId, data);

    await Promise.all(
        data.subscriptionDays.map(async (dayValue: createTypes.subscriptionDay) => {
            const subsDay = await createSubsDay(subs.raw.insertId, dayValue);

            await Promise.all(
                dayValue.subscriptionDishes.map(async (dishValue: createTypes.subscriptionDish) => {
                    const dish = await findDish(dayValue.shopId, dishValue.dishId);
                    await createSubsDish(subsDay.raw.insertId, dishValue.dishId, dish, dishValue.orderCount);
                })
            );
        })
    );

    return {};
};

export const updateSubs = async (userId: number, data: infoTypes.subscription) => {
    await deleteSubs(userId);
    await createSubs(userId, data);
};

export const deleteSubs = async (userId: number) => {
    propertyCheck(userId);

    const subsRepo = repository(SubsRepo);

    if ((await subsRepo.deleteSubs(userId)).affected !== 1) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};
