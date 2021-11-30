import Table from "@models/index";
import { shopAttributes } from "@models/shops";

const getDistance = (lat1: number, lat2: number, lon1: number, lon2: number) => {
    const rad = (deg: number) => deg * (Math.PI / 180);

    const radLat1: number = rad(lat1);
    const radLat2: number = rad(lat2);
    const radTheta: number = rad(lon1 - lon2);
    const dist: number = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

    return Math.floor(((Math.acos(dist > 1 ? 1 : dist) * 180) / Math.PI) * 60 * 1.1515 * 1.609344 * 1000);
};

export const aroundShop = async (lat: number, lon: number, radius: number) => {
    const shopList = await Table.Shops.findAll({ raw: true });
    if (!shopList) return null;

    const aroundShopList = shopList.map((data: shopAttributes) => {
        const distance = getDistance(lat, data.latitude, lon, data.longitude);
        if (distance <= radius) {
            const thumbDish = Table.Dishes.findAll({ raw: true });
            if (!thumbDish) return null;

            return {
                shopId: data.shopId,
                shopName: data.businessName,
                address: data.address,
                dayOff: data.dayOff,
                latitude: data.latitude,
                longitude: data.longitude,
                distance: distance,
                thumb1: thumbDish[0] !== undefined ? thumbDish[0].thumbnail : null,
                thumb2: thumbDish[1] !== undefined ? thumbDish[1].thumbnail : null,
                thumb3: thumbDish[2] !== undefined ? thumbDish[2].thumbnail : null,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            };
        }
    });
    return aroundShopList.filter((data) => data !== undefined);
};
