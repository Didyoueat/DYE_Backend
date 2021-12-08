import * as connection from "typeorm";
import { Dishes } from "@entities/dishes";
import { Subscriptions } from "@entities/subscriptions";
import { SubscriptionDishes } from "@entities/subscriptionDishes";

export const createSubscription = async (userId: number, data: object) => {
    const subsInsertResult: connection.InsertResult = await connection
        .getConnection()
        .createQueryBuilder()
        .insert()
        .into(Subscriptions)
        .values({
            userId: userId,
            shopId: data["shopId"],
            weekLabel: data["weekLabel"],
            oneTime: false,
            reciever: data["reciever"],
            address: data["address"],
            paymentState: data["paymentState"],
            deliveryCost: data["deliveryCost"],
            toShop: data["toShop"],
            toDelivery: data["toDelivery"],
        })
        .execute();

    console.log(subsInsertResult.raw.insertId);
    for (let i = 0; i < data["dishes"].length; i++) {
        await connection
            .getRepository(Dishes)
            .createQueryBuilder("dishes")
            .select()
            .where("dishes.dishId = :dishId", { dishId: data["dishes"][i].dishId })
            .getOne()
            .then(async (dish) => {
                await connection
                    .getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(SubscriptionDishes)
                    .values({
                        subscriptionId: subsInsertResult.raw.insertId,
                        dishId: data["dishes"][i].dishId,
                        oneTime: false,
                        main: dish.main,
                        title: dish.title,
                        orderCount: data["dishes"][i].orderCount,
                        price: dish.price,
                        weight: dish.weight,
                        imageUrl: dish.imageUrl,
                    })
                    .execute()
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log("err"));
    }

    return "";
};
