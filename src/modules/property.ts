import { ObjectType, getCustomRepository } from "typeorm";
import httpStatus from "http-status";
import { errorGenerator } from "@modules/api.error";
import infoTypes from "infoTypes";
import createTypes from "createTypes";
import updateTypes from "updateTypes";

/**
 * Custom Repository
 * @param repository
 * @returns Custom Repository
 */

export const repository = <T>(repository: ObjectType<T>) => getCustomRepository(repository);

/**
 * @param data
 * @returns
 */

const createProp = {
    user: ["staff", "loginStatus", "email", "password", "name", "age", "gender", "phone", "addrss", "paymentState", "paymentKey"],
    shop: ["businessName", "businessNumber", "password", "address", "latitude", "longitude", "name", "phone"],
    dish: ["main", "title", "price", "count", "weight"],
    subscription: ["address", "receiver", "subscriptionDays"],
    subscriptionDay: ["shopId", "weekLabel", "deliveryCost", "subscriptionDishes"],
};

const createCheck = (data: createTypes.user | createTypes.shop | createTypes.dish | createTypes.subscription, type: string) => {
    const prop: string[] =
        type === "user"
            ? createProp.user
            : type === "shop"
            ? createProp.shop
            : type === "dish"
            ? createProp.dish
            : type === "subscription"
            ? createProp.subscription
            : [];

    for (let i = 0; i < prop.length; i++) {
        if (!data[prop[i]]) {
            return false;
        }
        if (type === "subscription" && prop[i] === "subscriptionDays") {
            if (data[prop[i]].length === 0) {
                return false;
            }
            data[prop[i]].map((value) => {
                for (let j = 0; j < createProp.subscriptionDay.length; j++) {
                    const subsDay = createProp.subscriptionDay[j];
                    if (!value[subsDay]) {
                        return false;
                    }
                    if (subsDay === "subscriptionDishes") {
                        const subsDish = value[subsDay];
                        if (value[subsDay].length === 0) {
                            return false;
                        }
                        subsDish.map((dish) => {
                            if (!dish.dishId || !dish.orderCount) {
                                return false;
                            }
                        });
                    }
                }
            });
        }
    }
    return true;
};

/**
 *
 * @param arg
 */

const updateProp = {
    user: ["staff", "loginStatus", "email", "password", "name", "age", "gender", "phone", "addrss", "paymentState", "paymentKey"],
    shop: ["dayOff", "origin", "content", "officeHour", "temporaryDayStart", "temporaryDayEnd"],
    dish: ["main", "title", "content", "price", "count", "weight"],
    subscription: ["address", "receiver", "toShop", "toDelivery", "subscriptionDay"],
    subscriptionDay: ["shopId", "weekLabel", "deliveryCost", "dishes"],
};

const updateCheck = (data: updateTypes.user | updateTypes.shop | updateTypes.dish | updateTypes.subscription, type: string) => {
    const prop: string[] =
        type === "user"
            ? updateProp.user
            : type === "shop"
            ? updateProp.shop
            : type === "dish"
            ? updateProp.dish
            : type === "subscription"
            ? updateProp.subscription
            : [];
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        if (prop.indexOf(keys[i]) === -1) {
            return false;
        }
        if (type === "subscription" && keys[i] === "subscriptionDay") {
            if (data[keys[i]].length === 0 || data[keys[i]]["subscriptionDish"].length === 0) {
                return false;
            }
        }
    }
    return true;
};

/**
 * 타입 체크
 * @param arg
 */

export const propertyCheck = (...arg: any): void => {
    for (let i = 0; i < arg.length; i++) {
        if (typeof arg[i] === "number") {
            if (isNaN(arg[i])) {
                errorGenerator(httpStatus.BAD_REQUEST);
            }
        } else {
            if (arg[i].mode === "create") {
                if (!createCheck(arg[i].data, arg[i].type)) {
                    errorGenerator(httpStatus.BAD_REQUEST);
                }
            } else if (arg[i].mode === "update") {
                if (!updateCheck(arg[i].data, arg[i].type)) {
                    errorGenerator(httpStatus.BAD_REQUEST);
                }
            }
        }
    }
};
