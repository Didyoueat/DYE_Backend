import { EntityRepository, Repository } from "typeorm";
import infoTypes from "infoTypes";
import Dishes from "@entities/dishes";

@EntityRepository(Dishes)
export class DishRepo extends Repository<Dishes> {
    findShopAllDishes = (shopId: number) => {
        return this.createQueryBuilder("dishes").select().where("dishes.shopId = :shopId", { shopId: shopId }).getMany();
    };

    findDish = (shopId: number, dishId: number) => {
        return this.createQueryBuilder("dishes")
            .select()
            .where("dishes.shopId = :shopId AND dishes.dishId = :dishId", { shopId: shopId, dishId: dishId })
            .getOne();
    };

    findSoftDeletedShopDishes = (shopId: number) => {
        return this.createQueryBuilder("dishes")
            .select()
            .withDeleted()
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .getMany();
    };

    findSoftDeletedDish = (shopId: number, dishId: number) => {
        return this.createQueryBuilder("dishes")
            .select()
            .withDeleted()
            .where("dishes.shopId = :shopId AND dishes.dishId = :dishId", { shopId: shopId, dishId: dishId })
            .getOne();
    };

    createDish = async (shopId: number, data: infoTypes.dish) => {
        data.shopId = shopId;

        return await this.createQueryBuilder().insert().into(Dishes).values(data).execute();
    };

    updateDish = async (shopId: number, dishId: number, data: infoTypes.dish) => {
        return await this.createQueryBuilder("dishes")
            .update(Dishes)
            .set(data)
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .execute();
    };

    softDeleteShopDishes = async (shopId: number) => {
        return await this.createQueryBuilder("dishes")
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .softDelete()
            .execute();
    };

    softDeleteDish = async (shopId: number, dishId: number) => {
        return await this.createQueryBuilder("dishes")
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .softDelete()
            .execute();
    };

    deleteShopDishes = async (shopId: number) => {
        return await this.createQueryBuilder("dishes").where("dishes.shopId = :shopId", { shopId: shopId }).delete().execute();
    };

    deleteDish = async (shopId: number, dishId: number) => {
        return await this.createQueryBuilder("dishes")
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .delete()
            .execute();
    };
}
