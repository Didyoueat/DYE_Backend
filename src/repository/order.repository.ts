import { EntityRepository, getConnection, Repository } from "typeorm";
import { Orders } from "@entities/orders";
import { OrderDishes } from "@entities/order.dishes";

@EntityRepository(Orders)
export class OrderRepo extends Repository<Orders> {
    findAllOrders = () => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .orderBy("orders.userId", "ASC")
            .getMany();
    };

    findShopOrders = (shopId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.shopId = :shopId", { shopId: shopId })
            .orderBy("orders.userId", "ASC")
            .getMany();
    };

    findUserOrders = (userId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId", { userId: userId })
            .getMany();
    };

    findOrder = (userId: number, orderId: number) => {
        return this.createQueryBuilder("orders")
            .select()
            .leftJoinAndSelect("orders.orderDishes", "orderDishes")
            .where("orders.userId = :userId AND orders.orderId = :orderId", { userId: userId, orderId: orderId })
            .getOne();
    };

    /** 수정 필요 */
    deleteOrder = async (userId: number, orderId: number) => {
        return await this.createQueryBuilder()
            .update(Orders)
            .where("userId = :userId AND orderId = :orderId", { userId: userId, orderId: orderId })
            .softDelete()
            .execute();
    };

    /** 수정 필요 */
    deleteOrderDish = async (orderId: number) => {
        return await getConnection()
            .createQueryBuilder()
            .update(OrderDishes)
            .where("orderId = :orderId", { orderId: orderId })
            .softDelete()
            .execute();
    };
}
