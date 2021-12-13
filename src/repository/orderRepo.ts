import { EntityRepository, getConnection, Repository } from "typeorm";
import { Orders } from "@entities/orders";
import { OrderDishes } from "@entities/orderDishes";

@EntityRepository(Orders)
export class OrderRepo extends Repository<Orders> {
    findAllOrder = () => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.deleted = :deleted", { deleted: false })
            .getMany();
    };

    findShopOrder = (shopId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.shopId = :shopId AND orders.deleted = :deleted", { shopId: shopId, deleted: false })
            .getMany();
    };

    findUserOrder = (userId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId, AND orders.deleted = :deleted", { userId: userId, deleted: false })
            .getMany();
    };

    findOneOrder = (userId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId AND orders.deleted = :deleted", { userId: userId, deleted: false })
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
