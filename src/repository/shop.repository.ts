import { EntityRepository, Repository } from "typeorm";
import infoTypes from "infoTypes";
import { Shops } from "@entities/shops";

@EntityRepository(Shops)
export class ShopRepo extends Repository<Shops> {
    findAllShop = () => {
        return this.createQueryBuilder("shops").leftJoinAndSelect("shops.dishes", "dishes").getMany();
    };

    findAroundShop = (lat: number, lon: number, radius: number) => {
        return this.createQueryBuilder("shops")
            .addSelect(
                `6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lon})) + sin(radians(${lat})) * sin(radians(latitude)))`,
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

    findDeletedAllShop = () => {
        return this.createQueryBuilder("shops").where("shops.deletedAt = :deletedAt", { deletedAt: true }).getMany();
    };

    findDeletedOneShop = (shopId: number) => {
        return this.createQueryBuilder("shops")
            .select()
            .withDeleted()
            .where("shops.shopId = :shopId", {
                shopId: shopId,
            })
            .getOne();
    };

    createShop = async (data: infoTypes.shop) => {
        return await this.createQueryBuilder().insert().into(Shops).values(data).execute();
    };

    updateShop = async (shopId: number, data: infoTypes.shop) => {
        return await this.createQueryBuilder("shops")
            .update(Shops)
            .set(data)
            .where("shops.shopId = :shopId", { shopId: shopId })
            .execute();
    };

    softDeleteShop = async (shopId: number) => {
        return await this.createQueryBuilder("shops").where("shops.shopId = :shopId", { shopId: shopId }).softDelete().execute();
    };

    deleteShop = async (shopId: number) => {
        return await this.createQueryBuilder("shops").delete().where("shops.shopId = :shopId", { shopId: shopId }).execute();
    };
}
