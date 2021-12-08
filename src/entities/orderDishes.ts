import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Orders } from "@entities/orders";
import { Dishes } from "@entities/dishes";

@Entity("order_dishes")
export class OrderDishes {
    @PrimaryGeneratedColumn()
    orderDishId: number;

    @Column("int")
    orderId: number;

    @Column("int")
    dishId: number;

    @Column("boolean", { default: false })
    oneTime: boolean;

    @Column("boolean", { default: false })
    main: boolean;

    @Column("varchar", { length: 30 })
    title: string;

    @Column("int")
    orderCount: number;

    @Column("int")
    price: number;

    @Column("int")
    weight: number;

    @Column("varchar", { length: 255, nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Orders, (orders) => orders.orderDishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId", referencedColumnName: "orderId" })
    orders: OrderDishes;

    @ManyToOne(() => Dishes, (dishes) => dishes.orderDishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: OrderDishes;
}
