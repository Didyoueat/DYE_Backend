import { EntityRepository, Repository } from "typeorm";
import { infoTypes } from "infoTypes";
import { Shops } from "@entities/shops";

@EntityRepository(Shops)
export class ShopRepo extends Repository<Shops> {
    findAllShop = () => {
        return this.createQueryBuilder("shops").leftJoinAndSelect("shops.dishes", "dishes").getMany();
    };

    findAroundShop = (lat: number, lon: number, radius: number) => {
        return this.createQueryBuilder("shops")
            .addSelect(
                `(FLOOR(1000 * 6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lon})) + sin(radians(${lat})) * sin(radians(latitude)))))`,
                "distance"
            )
            .leftJoinAndSelect("shops.dishes", "dishes")
            .having(`distance <= ${radius}`)
            .orderBy("distance", "ASC")
            .getAroundShop();
    };

    findOneShop = (shopId: number) => {
        return this.createQueryBuilder("shops")
            .leftJoinAndSelect("shops.dishes", "dishes")
            .where("shops.shopId = :shopId", { shopId: shopId })
            .getOne();
    };

    createShop = async (data: infoTypes.shop) => {
        await this.createQueryBuilder().insert().into(Shops).values(data).execute();
    };

    updateShop = async (shopId: number, data: infoTypes.shop) => {
        await this.createQueryBuilder("shops")
            .update(Shops)
            .set(data)
            .where("shops.shopId = :shopId", { shopId: shopId })
            .execute();
    };

    deleteShop = async (shopId: number) => {
        await this.createQueryBuilder("shops").where("shops.shopId = :shopId", { shopId: shopId }).softDelete().execute();
    };
}
