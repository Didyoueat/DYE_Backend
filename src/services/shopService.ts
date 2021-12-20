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
    propertyCheck(shopId);

    const shopRepo = repository(ShopRepo);
    const shop = await shopRepo.findOneShop(shopId);

    delete shop.password;

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
