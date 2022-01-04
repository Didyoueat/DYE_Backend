import { EntityRepository, Repository } from "typeorm";
import { infoTypes } from "infoTypes";
import { Dishes } from "@entities/dishes";

@EntityRepository(Dishes)
export class DishRepo extends Repository<Dishes> {
    findShopDish = (shopId: number) => {
        return this.createQueryBuilder("dishes").select().where("dishes.shopId = :shopId", { shopId: shopId }).getMany();
    };

    findOneDish = (shopId: number, dishId: number) => {
        return this.createQueryBuilder("dishes")
            .select()
            .where("dishes.shopId = :shopId AND dishes.dishId = :dishId", { shopId: shopId, dishId: dishId })
            .getOne();
    };

    createDish = async (shopId: number, data: infoTypes.dish) => {
        data.shopId = shopId;

        await this.createQueryBuilder().insert().into(Dishes).values(data).execute();
    };

    updateDish = async (shopId: number, dishId: number, data: infoTypes.dish) => {
        await this.createQueryBuilder("dishes")
            .update(Dishes)
            .set(data)
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .execute();
    };

    deleteShopDishes = async (shopId: number) => {
        await this.createQueryBuilder("dishes").where("dishes.shopId = :shopId", { shopId: shopId }).softDelete().execute();
    };

    deleteDish = async (shopId: number, dishId: number) => {
        await this.createQueryBuilder("dishes")
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .softDelete()
            .execute();
    };
}
