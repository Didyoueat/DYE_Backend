import { ShopRepo } from "@repository/shopRepo";
import { repository, addProperty, propertyCheck } from "@modules/property";
import { infoTypes } from "infoTypes";

export const findAllShop = async () => {
    const shopRepo = repository(ShopRepo);
    const allShop = await shopRepo.findAllShop();

    return {
        shopCount: allShop.length,
        shops: allShop,
    };
};

export const findAroundShop = async (lat: number, lon: number, radius: number) => {
    propertyCheck(lat, lon, radius);

    const shopRepo = repository(ShopRepo);
    const aroundShop = await shopRepo.findAroundShop(lat, lon, radius);

    return {
        shopCount: aroundShop.length,
        shops: aroundShop,
    };
};

export const findOneShop = async (shopId: number) => {
    propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);
    const shop = await shopRepo.findOneShop(shopId);

    return shop;
};

export const createShop = async (data: infoTypes.shop) => {
    propertyCheck(data);

    const shopRepo = repository(ShopRepo);

    await shopRepo.createShop(data);
};

export const updateShop = async (shopId: number, data: infoTypes.shop) => {
    propertyCheck(shopId, addProperty(data, "shop"));

    const shopRepo = repository(ShopRepo);

    await shopRepo.updateShop(shopId, data);
};

export const deleteShop = async (shopId: number) => {
    propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);

    await shopRepo.deleteShop(shopId);
};
