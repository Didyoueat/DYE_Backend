import ApiError from "@modules/apiError";
import httpStatus from "http-status";
import { infoTypes } from "infoTypes";
import { repository, shopPropertyCheck, shopTypeCheck } from "@modules/property";
import { ShopRepo } from "@repository/shopRepo";

export const findAllShop = async () => {
    const shopRepo = repository(ShopRepo);
    const allShop = await shopRepo.findAllShop();

    return {
        shopCount: allShop.length,
        shops: allShop,
    };
};

export const findAroundShop = async (lat: number, lon: number, radius: number) => {
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

export const findOneShop = async (shopId: number) => {
    if (isNaN(shopId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const shopRepo = repository(ShopRepo);
    const shop = await shopRepo.findOneShop(shopId);

    delete shop.password;

    return shop;
};

export const createShop = (data: infoTypes.shop) => {
    if (!shopPropertyCheck(data) || !shopTypeCheck(data)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
    }

    const shopRepo = repository(ShopRepo);

    shopRepo.createShop(data);
};

export const updateShop = (shopId: number, data: infoTypes.shop) => {
    if (!shopTypeCheck(data) || isNaN(shopId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");
    }

    const shopRepo = repository(ShopRepo);

    shopRepo.updateShop(shopId, data);
};

export const deleteShop = (shopId: number) => {
    if (isNaN(shopId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const shopRepo = repository(ShopRepo);

    shopRepo.deleteShop(shopId);
};
