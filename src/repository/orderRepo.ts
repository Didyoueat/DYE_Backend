import { EntityRepository, getConnection, Repository } from "typeorm";
import { Orders } from "@entities/orders";
import { OrderDishes } from "@entities/orderDishes";

@EntityRepository(Orders)
export class OrderRepo extends Repository<Orders> {
    findAllOrder = () => {
        return this.createQueryBuilder("orders").select().leftJoinAndSelect("orders.orderDishes", "orderDishes").getMany();
    };

    findShopOrder = (shopId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.shopId = :shopId", { shopId: shopId })
            .getMany();
    };

    findUserOrder = (userId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId", { userId: userId })
            .getMany();
    };

    findOneOrder = (userId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId", { userId: userId })
            .getOne();
    };

    deleteOrder = async (userId: number, orderId: number) => {
        await this.createQueryBuilder()
            .update(Orders)
            .set({ deleted: true })
            .where("userId = :userId AND orderId = :orderId", { userId: userId, orderId: orderId })
            .execute();

        await getConnection()
            .createQueryBuilder()
            .update(OrderDishes)
            .set({ deleted: true })
            .where("orderId = :orderId", { orderId: orderId })
            .execute();
    };
}
