import * as connection from "typeorm";
import ApiError from "@modules/apiError";
import httpStatus from "http-status";
import { ShopRepo } from "@repository/shopRepo";
import { DishRepo } from "@repository/dishRepo";

interface shopData {
    businessName: string;
    businessNumber: string;
    businessPhone: string;
    dayOff: number;
    password: string;
    address: string;
    latitude: number;
    longitude: number;
    name: string;
    phone: string;
    origin: string | null;
    content: string | null;
    officeHour: string;
    temporaryDayStart: Date | null;
    temporaryDayEnd: Date | null;
}

const repository = <T>(repository: connection.ObjectType<T>) => connection.getCustomRepository(repository);

export const aroundShop = async (lat: number, lon: number, radius: number) => {
    if (isNaN(lat) || isNaN(lon) || isNaN(radius)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const shopRepo = repository(ShopRepo);
    const aroundShop = await shopRepo.findAroundShop(lat, lon, radius);
    const getDistance = (lat1: number, lat2: number, lon1: number, lon2: number) => {
        const rad = (deg: number) => deg * (Math.PI / 180);

        const radLat1: number = rad(lat1);
        const radLat2: number = rad(lat2);
        const radTheta: number = rad(lon1 - lon2);
        const dist: number = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

        return Math.floor(((Math.acos(dist > 1 ? 1 : dist) * 180) / Math.PI) * 60 * 1.1515 * 1.609344 * 1000);
    };

    return {
        shopCount: aroundShop.length,
        shops: aroundShop.map((value) => {
            delete value.password;
            value["distance"] = getDistance(lat, value.latitude, lon, value.longitude);
            value["dishCount"] = value.dishes.length;

            return value;
        }),
    };
};

export const shopInfo = async (id: number) => {
    if (isNaN(id)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const shopRepo = repository(ShopRepo);
    const shop = await shopRepo.findOneShop(id);

    delete shop.password;

    return shop;
};

export const shopCreate = (data: shopData) => {
    const isProperty = (value: any) => data.hasOwnProperty(value);
    if (
        !(
            isProperty(data.businessNumber) &&
            isProperty(data.businessName) &&
            isProperty(data.businessPhone) &&
            isProperty(data.dayOff) &&
            isProperty(data.password) &&
            isProperty(data.address) &&
            isProperty(data.latitude) &&
            isProperty(data.longitude) &&
            isProperty(data.name) &&
            isProperty(data.phone) &&
            isProperty(data.origin) &&
            isProperty(data.content) &&
            isProperty(data.officeHour) &&
            isProperty(data.temporaryDayStart) &&
            isProperty(data.temporaryDayEnd)
        )
    )
        throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    for (const key in data) {
        if (!(key === "origin" || key === "content" || key === "temporaryDayStart" || key === "temporaryDayEnd")) {
            if (key === "dayOff" || key === "latitude" || key === "longitude") {
                if (isNaN(data[key])) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
            } else {
                if (typeof data[key] !== "string") throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
            }
        }
    }
    // if (data.hasOwnProperty) const shopRepo = repository(ShopRepo);

    // shopRepo.createShop(data);
};
