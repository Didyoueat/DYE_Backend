import { getConnection } from "typeorm";
import { Users } from "@entities/users";
import { Shops } from "@entities/shops";
import { Dishes } from "@entities/dishes";
import { Subscriptions } from "@entities/subscriptions";
import { SubscriptionDays } from "@entities/subscription.days";
import { SubscriptionDishes } from "@entities/subscription.dishes";
// import { SubscriptionOnetime } from "@entities/subscription.onetime";
import { Orders } from "@entities/orders";
import { OrderDishes } from "@entities/order.dishes";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import { tableTypes } from "tableTypes";

const getEntity = (arg: string): any => {
    return arg === "user"
        ? Users
        : arg === "shop"
        ? Shops
        : arg === "dish"
        ? Dishes
        : arg === "subscription"
        ? Subscriptions
        : arg === "subscriptionDay"
        ? SubscriptionDays
        : arg === "subscriptionDish"
        ? SubscriptionDishes
        : // : arg === "subscriptionOnetime"
        // ? SubscriptionOnetime
        arg === "order"
        ? Orders
        : arg === "orderDish"
        ? OrderDishes
        : null;
};

const dataCheck = async (entity: any, key: string, value: number) => {
    const check = await getConnection()
        .createQueryBuilder()
        .select(`${key}.${key}Id`)
        .from(entity, key)
        .where(`${key}.${key}Id = :${key}Id`, { [key + "Id"]: value })
        .getOne();

    if (check == undefined) {
        errorGenerator(httpStatus.NOT_FOUND);
    }
};

const tableCheck = async (arg: tableTypes.tableId) => {
    for (const key in arg) {
        const value: number | number[] = arg[key];
        const entitiy = getEntity(key);

        if (typeof value === "number") {
            await dataCheck(entitiy, key, value);
        } else {
            for (let i = 0; i < value.length; i++) {
                await dataCheck(entitiy, key, value[i]);
            }
        }
    }
};

export const dishCheck = async (shopId: number, dishId: number[]) => {
    for (let i = 0; i < dishId.length; i++) {
        const check = await getConnection()
            .createQueryBuilder()
            .select(`dish.dishId`)
            .from(Dishes, "dish")
            .where(`dish.shopId = :shopId AND dish.dishId = :dishId`, { shopId: shopId, dishId: dishId[i] })
            .getOne();

        if (check == undefined) {
            errorGenerator(httpStatus.BAD_REQUEST);
        }
    }
    return true;
};

// export default tableCheck;
