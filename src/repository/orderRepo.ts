import { EntityRepository, getConnection, Repository } from "typeorm";
import { Orders } from "@entities/orders";
import { OrderDishes } from "@entities/orderDishes";

@EntityRepository(Orders)
export class OrderRepo extends Repository<Orders> {
    findAllOrder = () => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .orderBy("orders.userId", "ASC")
            .getMany();
    };

    findShopOrder = (shopId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.shopId = :shopId", { shopId: shopId })
            .orderBy("orders.userId", "ASC")
            .getMany();
    };

    findUserOrder = (userId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId", { userId: userId })
            .getMany();
    };

    findOneOrder = (userId: number, orderId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId AND orders.orderId = :orderId", { userId: userId, orderId: orderId })
            .getOne();
    };

    deleteOrder = async (userId: number, orderId: number) => {
        await this.createQueryBuilder()
            .update(Orders)
            .where("userId = :userId AND orderId = :orderId", { userId: userId, orderId: orderId })
            .softDelete()
            .execute();

        await getConnection()
            .createQueryBuilder()
            .update(OrderDishes)
            .where("orderId = :orderId", { orderId: orderId })
            .softDelete()
            .execute();
    };
}
