import * as connection from "typeorm";
import { Shops } from "@entities/shops";

const getDistance = (lat1: number, lat2: number, lon1: number, lon2: number) => {
    const rad = (deg: number) => deg * (Math.PI / 180);

    const radLat1: number = rad(lat1);
    const radLat2: number = rad(lat2);
    const radTheta: number = rad(lon1 - lon2);
    const dist: number = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);

    return Math.floor(((Math.acos(dist > 1 ? 1 : dist) * 180) / Math.PI) * 60 * 1.1515 * 1.609344 * 1000);
};

export const aroundShop = async (lat: number, lon: number, radius: number) => {
    const shopRepository: Array<Shops> = await connection
        .getRepository(Shops)
        .createQueryBuilder("shops")
        .select()
        .addSelect(
            `(FLOOR(1000 * 6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lon})) + sin(radians(${lat})) * sin(radians(latitude)))))`,
            "distance"
        )
        .leftJoinAndSelect("shops.dishes", "dishes")
        .having(`distance <= ${radius}`)
        .orderBy("distance", "ASC")
        .getMany()
        .then((shops) => {
            shops.map((value) => {
                delete value.password;
                value["distance"] = getDistance(lat, value.latitude, lon, value.longitude);
                value["dishCount"] = value.dishes.length;

                return value;
            });
            return shops;
        })
        .catch((err) => {
            return null;
        });

    return {
        shopCount: shopRepository.length,
        shops: shopRepository,
    };
};

export const shopInfo = async (id: number) => {
    const shopRepository: Shops = await connection
        .getRepository(Shops)
        .createQueryBuilder("shops")
        .select()
        .leftJoinAndSelect("shops.dishes", "dishes")
        .where("shops.shopId = :shopId", { shopId: id })
        .getOne()
        .then((shop) => {
            if (shop !== undefined) delete shop.password;
            return shop;
        })
        .catch((err) => {
            return null;
        });

    return shopRepository;
};
