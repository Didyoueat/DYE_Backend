import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { Subscriptions } from "@entities/subscriptions";
import { SubscriptionDishes } from "@entities/subscriptionDishes";
import { Dishes } from "@entities/dishes";
import { SubscriptionOnetime } from "@entities/subscriptionOnetime";

interface dishData {
    dishId: number;
    orderCount: number;
}

interface subsData {
    userId: number;
    shopId: number;
    weekLabel: number;
    reciever: string;
    address: string;
    deliveryCost: number;
    toShop: string | null;
    toDelivery: string | null;
    dishes: Array<dishData>;
    deleted: boolean;
}

interface subsDishData {
    dishes: Array<{
        subscriptionDishId: number;
        dishId: number;
        orderCount: number;
    }>;
}

@EntityRepository(Subscriptions)
export class SubsRepo extends Repository<Subscriptions> {
    findAllUserSubs = () => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes", "subsDishes.deleted = :deleted", { deleted: false })
            .where('subs.deleted = :deleted', {deleted: false})
            .getMany();
    };

    findShopSubs = (shopId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes", "subsDishes.deleted = :deleted", { deleted: false })
            .leftJoinAndSelect("users", "users", "users.userId = subs.userId")
            .where("subs.shopId = :shopId AND subs.deleted = :deleted", { shopId: shopId, deleted: false })
            .getMany();
    };

    findUserSubs = (userId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes", "subsDishes.deleted = :deleted", { deleted: false })
            .where("subs.userId = :userId AND subs.deleted = :deleted", { userId: userId, deleted: false })
            .getMany();
    };

    findOneSubs = (userId: number, subsId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes", "subsDishes.deleted = :deleted", { deleted: false })
            .where("subs.userId = :userId AND subs.deleted = :deleted", { userId: userId, deleted: false })
            .andWhere("subs.subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .getOne();
    };

    createSubs = async (userId: number, data: subsData) => {
        data.userId = userId;
        const subs = await this.createQueryBuilder().insert().into(Subscriptions).values(data).execute();
        const subsDish = data.dishes.map(async (value: dishData) => {
            const dish = await getRepository(Dishes)
                .createQueryBuilder("dishes")
                .select()
                .where("dishes.dishId = :dishId", { dishId: value.dishId })
                .getOne();

            return await getConnection()
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
                    deleted: false,
                })
                .execute();
        });

        return { subscriptions: subs, subscriptionDishes: subsDish };
    };

    updateSubsInfo = (userId: number, subsId: number, data: subsData) => {
        return this.createQueryBuilder()
            .update(Subscriptions)
            .set(data)
            .where("userId = :userId", { userId: userId })
            .andWhere("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();
    };

    updateSubsDish = async (userId: number, subsId: number, data: subsDishData) => {
        const oldDishes = data.dishes.map(async (value) => {
            return await getConnection()
                .createQueryBuilder()
                .update(SubscriptionDishes)
                .set({ deleted: true })
                .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
                    subscriptionId: subsId,
                    subscriptionDishId: value.subscriptionDishId,
                })
                .execute();
        });

        const newDishes = data.dishes.map(async (value) => {
            const dish = await getRepository(Dishes)
                .createQueryBuilder("dishes")
                .select()
                .where("dishes.dishId = :dishId", { dishId: value.dishId })
                .getOne();

            return await getConnection()
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
                    deleted: false,
                })
                .execute();
        });

        return { oldDishes: oldDishes, newDishes: newDishes };
    };

    updateSubsDishOnetime = async (userId: number, subsId: number, data: subsDishData) => {
        const oldDishes = data.dishes.map(async (value) => {
            return await getConnection()
                .createQueryBuilder()
                .update(SubscriptionDishes)
                .set({ oneTime: true })
                .where("subscriptionId = :subscriptionId AND subscriptionDishId = :subscriptionDishId", {
                    subscriptionId: subsId,
                    subscriptionDishId: value.subscriptionDishId,
                })
                .execute();
        });

        const newDishes = data.dishes.map(async (value) => {
            const dish = await getRepository(Dishes)
                .createQueryBuilder()
                .select()
                .where("dishId = :dishId", { dishId: value.dishId })
                .getOne();

            return await getConnection()
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
                    deleted: false,
                })
                .execute();
        });

        return { oldDishes: oldDishes, newDishes: newDishes };
    };

    deleteSubs = async (userId: number, subsId: number) => {
        await this.createQueryBuilder()
            .update(Subscriptions)
            .set({ deleted: true })
            .where("userId = :userId AND subscriptionId = :subscriptionId", {
                userId: userId,
                subscriptionId: subsId,
            })
            .execute();

        const subsDishes = await getRepository(SubscriptionDishes)
            .createQueryBuilder()
            .select()
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .getMany();

        await getConnection()
            .createQueryBuilder()
            .update(SubscriptionDishes)
            .set({ deleted: true })
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();

        subsDishes.map(async (value) => {
            await getConnection()
                .createQueryBuilder()
                .update(SubscriptionOnetime)
                .set({ deleted: true })
                .where("subscriptionDishId = :subscriptionDishId", { subscriptionDishId: value.subscriptionDishId })
                .execute();
        });
    };
}
