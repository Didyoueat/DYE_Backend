import { getConnection } from "typeorm";
import { Users } from "@entities/users";
import { Shops } from "@entities/shops";
import { Dishes } from "@entities/dishes";
import { Subscriptions } from "@entities/subscriptions";
import { SubscriptionDishes } from "@entities/subscriptionDishes";
import { SubscriptionOnetime } from "@entities/subscriptionOnetime";
import { Orders } from "@entities/orders";
import { OrderDishes } from "@entities/orderDishes";
import ApiError from "@modules/apiError";
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
        : arg === "subscriptionDish"
        ? SubscriptionDishes
        : arg === "subscriptionOnetime"
        ? SubscriptionOnetime
        : arg === "order"
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
        throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다. 없는 데이터를 참조 할 경우 이 오류가 발생합니다");
    }
};

const tableCheck = async (arg: tableTypes.tableId) => {
    for (const key in arg) {
        const value: number | number[] = arg[key];
        const entitiy = getEntity(key);

        if (entitiy === null) {
            throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
        } else {
            if (typeof value === "number") {
                await dataCheck(entitiy, key, value);
            } else {
                for (let i = 0; i < value.length; i++) {
                    await dataCheck(entitiy, key, value[i]);
                }
            }
        }
    }
};

export default tableCheck;
