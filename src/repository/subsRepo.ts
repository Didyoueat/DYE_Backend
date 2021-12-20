import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { Subscriptions } from "@entities/subscriptions";
import { SubscriptionDishes } from "@entities/subscriptionDishes";
import { SubscriptionOnetime } from "@entities/subscriptionOnetime";
import { Dishes } from "@entities/dishes";
import { infoTypes } from "infoTypes";

@EntityRepository(Subscriptions)
export class SubsRepo extends Repository<Subscriptions> {
    findAllUserSubs = () => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes")
            .orderBy("subs.userId", "ASC")
            .getMany();
    };

    findShopSubs = (shopId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .innerJoin("subs.users", "users", "users.userId = subs.userId")
            .addSelect(["users.userId", "users.name", "users.phone", "users.paymentState"])
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes")
            .leftJoinAndSelect("subsDishes.subscriptionOnetime", "subsOnetime")
            .where("subs.shopId = :shopId", { shopId: shopId })
            .orderBy("subs.userId", "ASC")
            .getMany();
    };

    findUserSubs = async (userId: number) => {
        return await this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes")
            .leftJoinAndSelect("subsDishes.subscriptionOnetime", "subsOnetime")
            .where("subs.userId = :userId", { userId: userId })
            .getMany();
    };

    findOneSubs = (userId: number, subsId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes")
            .leftJoinAndSelect("subsDishes.subscriptionOnetime", "subsOnetime")
            .where("subs.userId = :userId")
            .andWhere("subs.subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .getOne();
    };

    createSubs = async (userId: number, data: infoTypes.subscription) => {
        data.userId = userId;
        const subs = await this.createQueryBuilder().insert().into(Subscriptions).values(data).execute();

        data.dishes.map(async (value: infoTypes.subscriptionDish) => {
            const dish = await getRepository(Dishes)
                .createQueryBuilder("dishes")
                .select()
                .where("dishes.dishId = :dishId", { dishId: value.dishId })
                .getOne();

            getConnection()
                .createQueryBuilder()
                .insert()
                .into(SubscriptionDishes)
                .values({
                    subscriptionId: subs.raw.insertId,
                    dishId: value.dishId,
                    oldSubscriptionDishId: null,
                    oneTime: false,
                    main: dish.main,
                    title: dish.title,
                    price: dish.price,
                    orderCount: value.orderCount,
                    weight: dish.weight,
                    imageUrl: dish.imageUrl,
                })
                .execute();
        });
    };

    updateSubsInfo = async (userId: number, subsId: number, data: infoTypes.subscription) => {
        await this.createQueryBuilder()
            .update(Subscriptions)
            .set(data)
            .where("userId = :userId", { userId: userId })
            .andWhere("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();
    };

    updateSubsDish = async (userId: number, subsId: number, data: infoTypes.changeDish) => {
        data.changeDishes.map((value) => {
            getConnection()
                .createQueryBuilder()
                .softDelete()
                .from(SubscriptionDishes)
                .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
                    subscriptionId: subsId,
                    subscriptionDishId: value.subscriptionDishId,
                })
                .execute();
        });

        data.changeDishes.map(async (value) => {
            const dish = await getRepository(Dishes)
                .createQueryBuilder("dishes")
                .select()
                .where("dishes.dishId = :dishId", { dishId: value.dishId })
                .getOne();

            getConnection()
                .createQueryBuilder()
                .insert()
                .into(SubscriptionDishes)
                .values({
                    subscriptionId: subsId,
                    dishId: value.dishId,
                    oldSubscriptionDishId: value.subscriptionDishId,
                    oneTime: false,
                    main: dish.main,
                    title: dish.title,
                    price: dish.price,
                    orderCount: value.orderCount,
                    weight: dish.weight,
                    imageUrl: dish.imageUrl,
                })
                .execute();
        });
    };

    updateSubsDishOnetime = async (userId: number, subsId: number, data: infoTypes.changeDish) => {
        data.changeDishes.map((value) => {
            getConnection()
                .createQueryBuilder()
                .update(SubscriptionDishes)
                .set({ oneTime: true })
                .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
                    subscriptionId: subsId,
                    subscriptionDishId: value.subscriptionDishId,
                })
                .execute();
        });

        data.changeDishes.map(async (value) => {
            const onetime = await getRepository(SubscriptionOnetime)
                .createQueryBuilder()
                .select()
                .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: value.subscriptionDishId })
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

            const dish = await getRepository(Dishes)
                .createQueryBuilder()
                .select()
                .where("dishId = :dishId", { dishId: value.dishId })
                .getOne();

            getConnection()
                .createQueryBuilder()
                .insert()
                .into(SubscriptionOnetime)
                .values({
                    subscriptionDishId: value.subscriptionDishId,
                    dishId: value.dishId,
                    main: dish.main,
                    title: dish.title,
                    price: dish.price,
                    orderCount: value.orderCount,
                    weight: dish.weight,
                    imageUrl: dish.imageUrl,
                })
                .execute();
        });
    };

    deleteSubs = async (userId: number, subsId: number) => {
        await this.createQueryBuilder("subs")
            .where("userId = :userId AND subscriptionId = :subscriptionId", {
                userId: userId,
                subscriptionId: subsId,
            })
            .softDelete()
            .execute();

        const subsDishes = await getRepository(SubscriptionDishes)
            .createQueryBuilder()
            .select()
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .getMany();

        getConnection()
            .createQueryBuilder()
            .softDelete()
            .from(SubscriptionDishes)
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();

        subsDishes.map((value) => {
            if (value.oneTime === true) {
                getConnection()
                    .createQueryBuilder()
                    .softDelete()
                    .from(SubscriptionOnetime)
                    .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: value.subscriptionDishId })
                    .execute();
            }
        });
    };
}
