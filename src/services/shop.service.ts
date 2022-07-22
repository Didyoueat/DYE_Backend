import { repository, propertyCheck } from "@modules/property";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import infoTypes from "infoTypes";
import { ShopRepo } from "@repository/shop.repository";
import { ShopPostRepo } from "@repository/shop.post.repository";
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
    // propertyCheck(lat, lon, radius);

    const shopRepo = repository(ShopRepo);
    const aroundShop = await shopRepo.findAroundShops(lat, lon, radius);

    if (!aroundShop || aroundShop.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return aroundShop;
};

export const findOneShop = async (shopId: number) => {
    // propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);
    const shop = await shopRepo.findShop(shopId);

    if (!shop) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return shop;
};

export const createShop = async (data: infoTypes.shop) => {
    // propertyCheck({ data: data, type: "shop", mode: "create" });

    const shopRepo = repository(ShopRepo);

    if (!(await shopRepo.createShop(data)).raw.insertId) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};

export const updateShop = async (shopId: number, data: infoTypes.shop) => {
    // propertyCheck(shopId, { data: data, type: "shop", mode: "update" });

    const shopRepo = repository(ShopRepo);

    if ((await shopRepo.updateShop(shopId, data)).affected !== 1) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};

export const deleteShop = async (shopId: number) => {
    // propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);
    const dishRepo = repository(DishRepo);

    if (
        (await shopRepo.softDeleteShop(shopId)).affected !== 1 ||
        (await dishRepo.softDeleteShopDishes(shopId)).affected !== 1
    ) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};

/* ================================= */
/*             Shop Post             */
/* ================================= */

export const findAllShopPosts = async () => {
    const shopPostRepo = repository(ShopPostRepo);

    return await shopPostRepo.findAllShopPosts();
};

export const findShopPosts = async (shopId: number) => {
    const shopPostRepo = repository(ShopPostRepo);

    return await shopPostRepo.findShopPosts(shopId);
};

export const findOnePost = async (shopPostId: number) => {
    const shopPostRepo = repository(ShopPostRepo);

    return await shopPostRepo.findOnePost(shopPostId);
};

export const createShopPost = async (shopId: number, data: infoTypes.shopPost) => {
    const shopPostRepo = repository(ShopPostRepo);

    return await shopPostRepo.createShopPost(shopId, data);
};

export const updateShopPost = async (shopPostId: number, data: infoTypes.shopPost) => {
    const shopPostRepo = repository(ShopPostRepo);

    return await shopPostRepo.updateShopPost(shopPostId, data);
};

export const softDeleteShopPost = async (shopPostId: number) => {
    const shopPostRepo = repository(ShopPostRepo);

    return await shopPostRepo.softDeleteShopPost(shopPostId);
};

export const deleteShopPost = async (shopPostId: number) => {
    const shopPostRepo = repository(ShopPostRepo);

    return await shopPostRepo.deleteShopPost(shopPostId);
};
