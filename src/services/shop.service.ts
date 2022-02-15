import { repository, propertyCheck } from "@modules/property";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import infoTypes from "infoTypes";
import { ShopRepo } from "@repository/shop.repository";
import { DishRepo } from "@repository/dish.repository";

export const findAllShop = async () => {
    const shopRepo = repository(ShopRepo);
    const allShop = await shopRepo.findAllShops();

    if (!allShop || allShop.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return allShop;
};

export const findAroundShop = async (lat: number, lon: number, radius: number) => {
    propertyCheck(lat, lon, radius);

    const shopRepo = repository(ShopRepo);
    const aroundShop = await shopRepo.findAroundShops(lat, lon, radius);

    if (!aroundShop || aroundShop.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return aroundShop;
};

export const findOneShop = async (shopId: number) => {
    propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);
    const shop = await shopRepo.findShop(shopId);

    if (!shop) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return shop;
};

export const createShop = async (data: infoTypes.shop) => {
    propertyCheck({ data: data, type: "shop", mode: "create" });

    const shopRepo = repository(ShopRepo);

    if (!(await shopRepo.createShop(data)).raw.insertId) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};

export const updateShop = async (shopId: number, data: infoTypes.shop) => {
    propertyCheck(shopId, { data: data, type: "shop", mode: "update" });

    const shopRepo = repository(ShopRepo);

    if ((await shopRepo.updateShop(shopId, data)).affected !== 1) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};

export const deleteShop = async (shopId: number) => {
    propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);
    const dishRepo = repository(DishRepo);

    if ((await shopRepo.softDeleteShop(shopId)).affected !== 1 || (await dishRepo.softDeleteShopDishes(shopId)).affected !== 1) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};
