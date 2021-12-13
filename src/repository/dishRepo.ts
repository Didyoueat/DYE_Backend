import { EntityRepository, Repository } from "typeorm";
import { Dishes } from "@entities/dishes";

interface dishData {
    shopId: number;
    main: boolean;
    thumbnail: boolean;
    title: string;
    content: string | null;
    price: number;
    count: number;
    weight: number;
    imageUrl: string;
}

@EntityRepository(Dishes)
export class DishRepo extends Repository<Dishes> {
    findShopDish = (shopId: number) => {
        return this.createQueryBuilder("dishes").select().where("dishes.shopId = :shopId", { shopId: shopId }).getMany();
    };

    findOneDish = (shopId: number, dishId: number) => {
        return this.createQueryBuilder("dishes")
            .select()
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .getOne();
    };

    createDish = (shopId: number, data: dishData) => {
        data.shopId = shopId;
        return this.createQueryBuilder().insert().into(Dishes).values(data).execute();
    };

    updateDish = (shopId: number, dishId: number, data: dishData) => {
        return this.createQueryBuilder("dishes")
            .update(Dishes)
            .set(data)
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .execute();
    };

    deleteDish = (shopId: number, dishId: number) => {
        return this.createQueryBuilder("dishes")
            .delete()
            .from(Dishes)
            .where("dishes.shopId = :shopId", { shopId: shopId })
            .andWhere("dishes.dishId = :dishId", { dishId: dishId })
            .execute();
    };
}
