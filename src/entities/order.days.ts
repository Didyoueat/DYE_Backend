import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    DeleteDateColumn,
} from "typeorm";
import Shops from "@entities/shops";
import Orders from "@entities/orders";
import OrderDishes from "./order.dishes";

@Entity("orders_days")
export default class OrderDays {
    @PrimaryGeneratedColumn()
    orderDayId: number;

    @Column("int")
    orderId: number;

    @Column("int")
    shopId: number;

    @Column("int")
    weekLabel: number;

    @Column("int")
    deliveryCost: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => OrderDishes, (orderDishes) => orderDishes.orderDays)
    orderDishes: OrderDishes[];

    @ManyToOne(() => Shops, (shops) => shops.orderDays, { nullable: false })
    @JoinColumn({ name: "shopId" })
    shops: Shops;

    @ManyToOne(() => Orders, (orders) => orders.orderDays, { nullable: false })
    @JoinColumn({ name: "orderId" })
    orders: Orders;
}
