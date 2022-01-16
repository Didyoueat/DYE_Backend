import { ObjectType, getCustomRepository } from "typeorm";
import httpStatus from "http-status";
import ApiError from "@modules/api.error";
import infoTypes from "infoTypes";

/**
 * Custom Repository
 * @param repository
 * @returns Custom Repository
 */

export const repository = <T>(repository: ObjectType<T>) => getCustomRepository(repository);

/**
 * 객체 빈 key = undefined 조합
 * @param data
 * @returns
 */

const userProp: string[] = [
    "staff",
    "loginStatus",
    "email",
    "password",
    "name",
    "age",
    "gender",
    "phone",
    "addrss",
    "paymentState",
    "paymentKey",
];

const shopProp: string[] = [
    "businessName",
    "businessNumber",
    "businessPhone",
    "password",
    "dayOff",
    "latitude",
    "longitude",
    "name",
    "phone",
    "origin",
    "content",
    "officeHour",
    "temporaryDayStart",
    "temporaryDayEnd",
];

const dishProp: string[] = ["main", "thumbnail", "title", "content", "price", "count", "weight"];

const subsProp: string[] = [
    "shopId",
    "weekLabel",
    "reciever",
    "address",
    "paymentState",
    "deliveryCost",
    "toshop",
    "toDelivery",
    "dishes",
];

export const addProperty = (data: infoTypes.user | infoTypes.shop | infoTypes.dish | infoTypes.subscription, type: string) => {
    const prop: string[] =
        type === "user"
            ? userProp
            : type === "shop"
            ? shopProp
            : type === "dish"
            ? dishProp
            : type === "subscription"
            ? subsProp
            : [];

    for (let i = 0; i < prop.length; i++) {
        if (data[prop[i]] === undefined) {
            data[prop[i]] = undefined;
        }
    }
    return data;
};

/**
 * 데이터 타입 체크
 * @param data
 * @returns boolean
 */

const userTypeCheck = (data: infoTypes.user): boolean => {
    for (const key in data) {
        if (data[key] === undefined) {
            continue;
        } else if (key === "age" && typeof data[key] !== "number") {
            return false;
        } else if (key === "loginStatus" || key === "email" || key === "phone" || key === "gender" || key === "address") {
            if (typeof data[key] !== "string") return false;
        } else {
            if (typeof data[key] !== "string" && data[key] !== null) return false;
        }
    }
};

const shopTypeCheck = (data: infoTypes.shop): boolean => {
    for (const key in data) {
        if (data[key] === undefined) {
            continue;
        } else if (!(key === "origin" || key === "content" || key === "temporaryDayStart" || key === "temporaryDayEnd")) {
            if (key === "dayOff" || key === "latitude" || key === "longitude") {
                if (isNaN(data[key])) return false;
            } else {
                if (typeof data[key] !== "string") return false;
            }
        } else {
            if (key === "temporaryDayStart" || key === "temporaryDayEnd") {
                if (typeof data[key] !== "object" && data[key] !== null) return false;
            } else {
                if (typeof data[key] !== "string" && data[key] !== null) return false;
            }
        }
    }

    return true;
};

const dishTypeCheck = (data: infoTypes.dish): boolean => {
    for (const key in data) {
        if (data[key] === undefined) {
            continue;
        } else if (key === "price" || key === "count" || key === "weight") {
            if (isNaN(data[key])) return false;
        } else if (key === "main" || key === "thumbnail") {
            if (typeof data[key] !== "boolean") return false;
        } else {
            if (key === "title") {
                if (typeof data[key] !== "string") return false;
            } else if (key === "content") {
                if (typeof data[key] !== "string" && data[key] !== null) return false;
            } else {
                return false;
            }
        }
    }

    return true;
};

const subsTypeCheck = (data: infoTypes.subscription): boolean => {
    for (const key in data) {
        if (data[key] === undefined) {
            continue;
        } else if (key === "shopId" || key === "weekLabel" || key === "deliveryCost") {
            if (isNaN(data[key])) return false;
        } else if (key === "dishes") {
            const dishes: Array<infoTypes.subscriptionDish> = data[key];
            const option: string[] = ["dishId", "orderCount"];

            if (dishes.length === 0) return false;
            for (let i = 0; i < dishes.length; i++) {
                if (JSON.stringify(option.sort()) !== JSON.stringify(Object.keys(dishes[i]).sort())) return false;
                if (isNaN(dishes[i].dishId) || isNaN(dishes[i].orderCount)) return false;
            }
        } else {
            if (key === "reciever" || key === "address") {
                if (typeof data[key] !== "string") return false;
            } else {
                if (typeof data[key] !== "string" && data[key] !== null) return false;
            }
        }
    }

    return true;
};

const changeTypeCheck = (data: infoTypes.changeDish): boolean => {
    if (data["changeDishes"].length === 0) return false;

    for (let i = 0; i < data["changeDishes"].length; i++) {
        const { subscriptionDishId, dishId, orderCount } = data["changeDishes"][i];
        if (isNaN(subscriptionDishId) || isNaN(dishId) || isNaN(orderCount)) return false;
    }

    return true;
};

/**
 * 데이터 분리
 * @param data
 * @returns boolean
 */

const typeSeparate = (
    data: infoTypes.user | infoTypes.shop | infoTypes.dish | infoTypes.subscription | infoTypes.changeDish
): boolean => {
    if ("loginStatus" in data) {
        return userTypeCheck(data);
    } else if ("businessName" in data) {
        return shopTypeCheck(data);
    } else if ("thumbnail" in data) {
        return dishTypeCheck(data);
    } else if ("reciever" in data) {
        return subsTypeCheck(data);
    } else if ("changeDishes" in data) {
        return changeTypeCheck(data);
    } else {
        return false;
    }
};

/**
 * 타입 체크
 * @param arg
 */

export const propertyCheck = (...arg: any[]): void => {
    for (let i = 0; i < arg.length; i++) {
        if (typeof arg[i] === "number") {
            if (isNaN(arg[i])) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
        } else {
            if (!typeSeparate(arg[i])) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
            for (const key in arg[i]) {
                if (arg[i][key] === undefined) delete arg[i][key];
            }
        }
    }
};
