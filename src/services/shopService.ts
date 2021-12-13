import * as connection from "typeorm";
import { ShopRepo } from "@repository/shopRepo";

const getDistance = (lat1: number, lat2: number, lon1: number, lon2: number) => {
    const rad = (deg: number) => deg * (Math.PI / 180);

    const radLat1: number = rad(lat1);
    const radLat2: number = rad(lat2);
    const radTheta: number = rad(lon1 - lon2);
    const dist: number = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

    return Math.floor(((Math.acos(dist > 1 ? 1 : dist) * 180) / Math.PI) * 60 * 1.1515 * 1.609344 * 1000);
};

export const aroundShop = async (lat: number, lon: number, radius: number) => {
    const shopRepo = connection.getCustomRepository(ShopRepo);
    const aroundShop = await shopRepo.findAroundShop(lat, lon, radius);

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
    const shopRepo = connection.getCustomRepository(ShopRepo);
    const shop = await shopRepo.findOneShop(id);

    delete shop.password;

    return shop;
};
