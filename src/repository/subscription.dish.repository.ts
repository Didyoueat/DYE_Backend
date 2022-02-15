import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { SubscriptionDishes } from "@entities/subscription.dishes";
// import { SubscriptionOnetime } from "@entities/subscription.onetime";
import { Dishes } from "@entities/dishes";
import infoTypes from "infoTypes";

@EntityRepository(SubscriptionDishes)
export class SubsDishRepo extends Repository<SubscriptionDishes> {
    findSubsDishes = (subsId: number) => {
        return this.createQueryBuilder().select().where("subscriptionId = :subscriptionId", { subscriptionId: subsId }).getMany();
    };

    findSubsDish = (subsDishId: number) => {
        return this.createQueryBuilder()
            .select()
            .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
            .getOne();
    };

    findOnetimeSubsDish = (subsDishId: number) => {
        return this.createQueryBuilder("subsDish")
            .select()
            .leftJoinAndSelect("subsDish.subscriptionOnetime", "subsOnetime")
            .where("subsDish.subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
            .getOne();
    };

    findSoftDeletedSubsDishes = (subsId: number) => {
        return this.createQueryBuilder()
            .select()
            .withDeleted()
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .getMany();
    };

    findSoftDeletedSubsDish = (subsDishId: number) => {
        return this.createQueryBuilder()
            .select()
            .withDeleted()
            .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
            .getOne();
    };

    createSubsDish = async (subsDayId: number, dishId: number, dish: infoTypes.dish, orderCount: number) => {
        return await this.createQueryBuilder()
            .insert()
            .into(SubscriptionDishes)
            .values({
                subscriptionDayId: subsDayId,
                dishId: dishId,
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

    updateSubsDish = async (subsId: number, subsDishId: number, dishId: number, dish: infoTypes.dish, orderCount: number) => {
        await this.createQueryBuilder()
            .softDelete()
            .from(SubscriptionDishes)
            .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
                subscriptionId: subsId,
                subscriptionDishId: subsDishId,
            })
            .execute();

        // return await this.createQueryBuilder()
        //     .insert()
        //     .into(SubscriptionDishes)
        //     .values({
        //         subscriptionId: subsId,
        //         dishId: dishId,
        //         oldSubscriptionDishId: subsDishId,
        //         oneTime: false,
        //         main: dish.main,
        //         title: dish.title,
        //         price: dish.price,
        //         orderCount: orderCount,
        //         weight: dish.weight,
        //         imageUrl: dish.imageUrl,
        //     })
        //     .execute();
    };

    /**
     * 이번만 구독 일단 폐기
     */

    // updateSubsOnetime = async (subsId: number, subsDishId: number, dishId: number, dish: infoTypes.dish, orderCount: number) => {
    //     await this.createQueryBuilder()
    //         .update(SubscriptionDishes)
    //         .set({ oneTime: true })
    //         .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
    //             subscriptionId: subsId,
    //             subscriptionDishId: subsDishId,
    //         })
    //         .execute();

    //     const onetime = await getRepository(SubscriptionOnetime)
    //         .createQueryBuilder()
    //         .select()
    //         .withDeleted()
    //         .where("subscriptionDishId = :subscriptionDishId", {
    //             subscriptionDishId: subsDishId,
    //         })
    //         .getOne();

    //     if (onetime !== undefined) {
    //         await getConnection()
    //             .createQueryBuilder()
    //             .softDelete()
    //             .from(SubscriptionOnetime)
    //             .where("subscriptionOnetimeId = :subscriptionOnetimeId", {
    //                 subscriptionOnetimeId: onetime.subscriptionOnetimeId,
    //             })
    //             .execute();
    //     }

    //     return await getConnection()
    //         .createQueryBuilder()
    //         .insert()
    //         .into(SubscriptionOnetime)
    //         .values({
    //             subscriptionDishId: subsDishId,
    //             dishId: dishId,
    //             main: dish.main,
    //             title: dish.title,
    //             price: dish.price,
    //             orderCount: orderCount,
    //             weight: dish.weight,
    //             imageUrl: dish.imageUrl,
    //         })
    //         .execute();
    // };

    // updateCancleOnetime = async (subsDishId: number) => {
    //     const onetime = await this.findOnetimeSubsDish(subsDishId);

    //     await getConnection()
    //         .createQueryBuilder()
    //         .softDelete()
    //         .from(SubscriptionOnetime)
    //         .where("subscriptionOnetimeId = :subscriptionOnetimeId", {
    //             subscriptionOnetimeId: onetime.subscriptionOnetime[0].subscriptionOnetimeId,
    //         })
    //         .execute();

    //     return await this.createQueryBuilder()
    //         .update(SubscriptionDishes)
    //         .set({ oneTime: false })
    //         .where("subscriptionDishId = :subscriptionDishId", {
    //             subscriptionDishId: subsDishId,
    //         })
    //         .execute();
    // };

    softDeleteSubsDishes = async (subsId: number) => {
        return await this.createQueryBuilder()
            .softDelete()
            .from(SubscriptionDishes)
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();
    };

    softDeleteSubsDish = async (subsDishId: number) => {
        return await this.createQueryBuilder()
            .softDelete()
            .from(SubscriptionDishes)
            .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
            .execute();
    };

    // softDeleteSubsOnetime = async (subsDishId: number) => {
    //     return await getConnection()
    //         .createQueryBuilder()
    //         .softDelete()
    //         .from(SubscriptionOnetime)
    //         .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
    //         .execute();
    // };

    deleteSubsDishes = async (subsId: number) => {
        return await this.createQueryBuilder()
            .delete()
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();
    };

    deleteSubsDish = async (subsDishId: number) => {
        return await this.createQueryBuilder()
            .delete()
            .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: subsDishId })
            .execute();
    };
}
