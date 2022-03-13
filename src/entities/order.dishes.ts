import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
} from "typeorm";
import OrderDays from "@entities/order.days";
import Dishes from "@entities/dishes";

@Entity("order_dishes")
export default class OrderDishes {
    @PrimaryGeneratedColumn()
    orderDishId: number;

    @Column("int")
    orderDayId: number;

    @Column("int")
    dishId: number;

    @Column("boolean", { default: false })
    oneTime: boolean;

    @Column("boolean", { default: false })
    main: boolean;

    @Column("int")
    orderCount: number;

    @Column("varchar", { length: 30 })
    title: string;

    @Column("int")
    price: number;

    @Column("int")
    weight: number;

    @Column("varchar", { length: 500, nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @ManyToOne(() => OrderDays, (orderDays) => orderDays.orderDishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "orderDayId", referencedColumnName: "orderDayId" })
    orderDays: OrderDays;

    @ManyToOne(() => Dishes, (dishes) => dishes.orderDishes, { nullable: false })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: Dishes;
}
