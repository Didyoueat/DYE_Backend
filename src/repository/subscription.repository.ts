import { EntityRepository, getConnection, Repository } from "typeorm";
import createTypes from "createTypes";
import updateTypes from "updateTypes";
import Subscriptions from "@entities/subscriptions";
import SubscriptionDays from "@entities/subscription.days";

@EntityRepository(Subscriptions)
export class SubsRepo extends Repository<Subscriptions> {
    findAllSubs = () => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDays", "subsDays")
            .leftJoinAndSelect("subsDays.subscriptionDishes", "subsDishes")
            .orderBy("subs.userId", "ASC")
            .getMany();
    };

    findShopSubs = (shopId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDays", "subsDays", "subsDays.shopId = :shopId", { shopId: shopId })
            .leftJoinAndSelect("subsDays.subscriptionDishes", "subsDish")
            .where("subsDays.shopId = :shopId", { shopId: shopId })
            .getMany();
    };

    findUserSubs = (userId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDays", "subsDays")
            .leftJoinAndSelect("subsDays.subscriptionDishes", "subsDishes")
            .where("subs.userId = :userId", { userId: userId })
            .getOne();
    };

    findUserSubsDay = (userId: number, subsDayId: number) => {
        return this.createQueryBuilder("subs")
            .select()
            .leftJoinAndSelect("subs.subscriptionDays", "subsDays", "subsDays.subscriptionDayId = :subscriptionDayId", {
                subscriptionDayId: subsDayId,
            })
            .leftJoinAndSelect("subsDays.subscriptionDishes", "subsDishes")
            .where("subs.userId = :userId", { userId: userId })
            .getOne();
    };

    findSoftDeletedSubs = (subsId: number) => {
        return this.createQueryBuilder()
            .withDeleted()
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .getOne();
    };

    createSubs = async (userId: number, data: createTypes.subscription) => {
        return await this.createQueryBuilder()
            .insert()
            .into(Subscriptions)
            .values({
                userId: userId,
                receiver: data.receiver,
                address: data.address,
                toShop: data.toShop,
                toDelivery: data.toDelivery,
            })
            .execute();
    };

    createSubsDay = async (subsId: number, data: createTypes.subscriptionDay) => {
        return await this.createQueryBuilder()
            .insert()
            .into(SubscriptionDays)
            .values({
                subscriptionId: subsId,
                shopId: data.shopId,
                weekLabel: data.weekLabel,
                deliveryCost: data.deliveryCost,
            })
            .execute();
    };

    // updateSubs = async (userId: number, data: updateTypes.subscription) => {
    //     const updateData: updateTypes.subscription = {};

    //     if (data.address) updateData.address = data.address;
    //     if (data.receiver) updateData.receiver = data.receiver;
    //     if (data.toShop) updateData.toShop = data.toShop;
    //     data.toDelivery ? (updateData.toDelivery = data.toDelivery) : null;

    //     return await this.createQueryBuilder()
    //         .update(Subscriptions)
    //         .set(data)
    //         .where("userId = :userId", { userId: userId })
    //         .execute();
    // };

    softDeleteSubs = async (subsId: number) => {
        return await this.createQueryBuilder()
            .where("subscriptionId = :subscriptionId", { subscriptionId: subsId })
            .softDelete()
            .execute();
    };

    deleteSubs = async (userId: number) => {
        return await this.createQueryBuilder().delete().where("userId = :userId", { userId: userId }).execute();
    };
}
