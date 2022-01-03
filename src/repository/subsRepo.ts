import { EntityRepository, Repository } from "typeorm";
import { infoTypes } from "infoTypes";
import { Subscriptions } from "@entities/subscriptions";

@EntityRepository(Subscriptions)
export class SubsRepo extends Repository<Subscriptions> {
    findAllUserSubs = () => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDishes", "subsDishes")
            .leftJoinAndSelect("subsDishes.subscriptionOnetime", "subsOnetime")
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

    findUserSubs = (userId: number) => {
        return this.createQueryBuilder("subs")
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
            .where("subs.userId = :userId", { userId: userId })
            .andWhere("subs.subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .getOne();
    };

    createSubs = async (userId: number, data: infoTypes.subscription) => {
        data.userId = userId;
        return await this.createQueryBuilder().insert().into(Subscriptions).values(data).execute();
    };

    updateSubsInfo = async (userId: number, subsId: number, data: infoTypes.subscription) => {
        await this.createQueryBuilder()
            .update(Subscriptions)
            .set(data)
            .where("userId = :userId", { userId: userId })
            .andWhere("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .execute();
    };

    deleteSubs = async (userId: number, subsId: number) => {
        await this.createQueryBuilder("subs")
            .where("userId = :userId AND subscriptionId = :subscriptionId", {
                userId: userId,
                subscriptionId: subsId,
            })
            .softDelete()
            .execute();
    };

    deleteCompletely = async (subsId: number) => {
        await this.createQueryBuilder("subs")
            .delete()
            .from(Subscriptions)
            .where("subscriptionId = :subscriptionId", {
                subscriptionId: subsId,
            })
            .execute();
    };
}
