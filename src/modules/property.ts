import { infoTypes } from "infoTypes";
import { ObjectType, getCustomRepository } from "typeorm";

/**
 * Custom Repository
 * @param repository
 * @returns Custom Repository
 */

export const repository = <T>(repository: ObjectType<T>) => getCustomRepository(repository);

/**
 * 데이터 유효성 검사
 * @param data
 * @returns boolean
 */

const isProperty = (data: infoTypes.shop | infoTypes.dish | infoTypes.subscription, value: any): boolean =>
    data.hasOwnProperty(value);

export const shopPropertyCheck = (data: infoTypes.shop): boolean => {
    return (
        isProperty(data, data.businessNumber) &&
        isProperty(data, data.businessName) &&
        isProperty(data, data.businessPhone) &&
        isProperty(data, data.dayOff) &&
        isProperty(data, data.password) &&
        isProperty(data, data.address) &&
        isProperty(data, data.latitude) &&
        isProperty(data, data.longitude) &&
        isProperty(data, data.name) &&
        isProperty(data, data.phone) &&
        isProperty(data, data.origin) &&
        isProperty(data, data.content) &&
        isProperty(data, data.officeHour) &&
        isProperty(data, data.temporaryDayStart) &&
        isProperty(data, data.temporaryDayEnd)
    );
};

export const dishPropertyCheck = (data: infoTypes.dish): boolean => {
    return (
        isProperty(data, data.main) &&
        isProperty(data, data.thumbnail) &&
        isProperty(data, data.title) &&
        isProperty(data, data.content) &&
        isProperty(data, data.price) &&
        isProperty(data, data.count) &&
        isProperty(data, data.weight)
    );
};

/**
 * 데이터 타입 체크
 * @param data
 * @returns boolean
 */

export const shopTypeCheck = (data: infoTypes.shop): boolean => {
    for (const key in data) {
        if (!(key === "origin" || key === "content" || key === "temporaryDayStart" || key === "temporaryDayEnd")) {
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

export const dishTypeCheck = (data: infoTypes.dish): boolean => {
    for (const key in data) {
        if (key === "price" || key === "count" || key === "weight") {
            if (isNaN(data[key])) return false;
        } else if (key === "main" || key === "thumbnail") {
            if (typeof data[key] !== "boolean") return false;
        } else {
            if (key === "title") {
                if (typeof data[key] !== "string") return false;
            } else {
                if (typeof data[key] !== "string" && data[key] !== null) return false;
            }
        }
    }

    return true;
};
