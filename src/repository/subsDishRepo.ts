import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { SubscriptionDishes } from "@entities/subscriptionDishes";
import { SubscriptionOnetime } from "@entities/subscriptionOnetime";
import { Dishes } from "@entities/dishes";

@EntityRepository(SubscriptionDishes)
export class SubsDishRepo extends Repository<SubscriptionDishes> {
    createSubsDish = async (subsId: number, dish: Dishes, orderCount: number) => {
        await this.createQueryBuilder()
            .insert()
            .into(SubscriptionDishes)
            .values({
                subscriptionId: subsId,
                dishId: dish.dishId,
                oldSubscriptionDishId: null,
                oneTime: false,
                main: dish.main,
                title: dish.title,
                price: dish.price,
                orderCount: orderCount,
                weight: dish.weight,
                imageUrl: dish.imageUrl,
            })
            .execute();
    };

    updateSubsDish = async (subsId: number, subsDishId: number, dish: Dishes, orderCount: number) => {
        await this.createQueryBuilder()
            .softDelete()
            .from(SubscriptionDishes)
            .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
                subscriptionId: subsId,
                subscriptionDishId: subsDishId,
            })
            .execute();

        await this.createQueryBuilder()
            .insert()
            .into(SubscriptionDishes)
            .values({
                subscriptionId: subsId,
                dishId: dish.dishId,
                oldSubscriptionDishId: subsDishId,
                oneTime: false,
                main: dish.main,
                title: dish.title,
                price: dish.price,
                orderCount: orderCount,
                weight: dish.weight,
                imageUrl: dish.imageUrl,
            })
            .execute();
    };

    updateSubsOnetime = async (subsId: number, subsDishId: number, dish: Dishes, orderCount: number) => {
        this.createQueryBuilder()
            .update(SubscriptionDishes)
            .set({ oneTime: true })
            .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
                subscriptionId: subsId,
                subscriptionDishId: subsDishId,
            })
            .execute();

        const onetime = await getRepository(SubscriptionOnetime)
            .createQueryBuilder()
            .select()
            .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
            .getOne();

        if (onetime.subscriptionOnetimeId !== undefined) {
            getConnection()
                .createQueryBuilder()
                .softDelete()
                .from(SubscriptionOnetime)
                .where("subscriptionOnetimeId = :subscriptionOnetimeId", {
                    subscriptionOnetimeId: onetime.subscriptionOnetimeId,
                })
                .execute();
        }

        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(SubscriptionOnetime)
            .values({
                subscriptionDishId: subsDishId,
                dishId: dish.dishId,
                main: dish.main,
                title: dish.title,
                price: dish.price,
                orderCount: orderCount,
                weight: dish.weight,
                imageUrl: dish.imageUrl,
            })
            .execute();
    };

    deleteSubsDish = async (subsId: number) => {
        await this.createQueryBuilder()
            .softDelete()
            .from(SubscriptionDishes)
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();
    };

    deleteSubsOnetime = async (subsDishId: number) => {
        await getConnection()
            .createQueryBuilder()
            .softDelete()
            .from(SubscriptionOnetime)
            .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
            .execute();
    };
}
