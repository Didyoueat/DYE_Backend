import { repository, propertyCheck } from "@modules/property";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import infoTypes from "infoTypes";
import { ShopRepo } from "@repository/shop.repository";
import { DishRepo } from "@repository/dish.repository";
import Shops from "@entities/shops";

const delArray = (shop: Shops) => {
    if (shop.addresses.length > 0) {
        const location = shop.addresses.filter((address) => address.main === true)[0];
        delete shop.addresses;
        delete location.userId;
        delete location.shopId;
        shop["location"] = location;
    }
    if (shop.shopTemporaryDays.length > 0) {
        const temporaryDayId = Math.max.apply(
            Math,
            shop.shopTemporaryDays.map((day) => day.shopTemporaryDayId)
        );
        shop["temporaryDay"] = {
            start: shop.shopTemporaryDays.filter((day) => day.shopTemporaryDayId === temporaryDayId)[0].startDay,
            end: shop.shopTemporaryDays.filter((day) => day.shopTemporaryDayId === temporaryDayId)[0].endDay,
        };
        delete shop.shopTemporaryDays;
    }
};

export const findAllShop = async () => {
    const shopRepo = repository(ShopRepo);
    const allShop = await shopRepo.findAllShops();

    if (!allShop || allShop.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }
    console.log(allShop);
    allShop.map((shop) => delArray(shop));

    return allShop;
};

export const findAroundShop = async (lat: number, lon: number, radius: number) => {
    propertyCheck(lat, lon, radius);

    const shopRepo = repository(ShopRepo);
    const aroundShop = await shopRepo.findAroundShops(lat, lon, radius);

    if (!aroundShop || aroundShop.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    aroundShop.map((shop) => delArray(shop));

    return aroundShop;
};

export const findOneShop = async (shopId: number) => {
    propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);
    const shop = await shopRepo.findShop(shopId);

    if (!shop) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    delArray(shop);

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
