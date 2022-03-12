import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Shops } from "@entities/shops";
import { SubscriptionDishes } from "@entities/subscription.dishes";
// import { SubscriptionOnetime } from "@entities/subscription.onetime";
import { OrderDishes } from "@entities/order.dishes";

@Entity("dishes")
export class Dishes {
    @PrimaryGeneratedColumn()
    dishId: number;

    @Column("int")
    shopId: number;

    @Column("boolean", { default: false })
    main: boolean;

    @Column("boolean", { default: false })
    thumbnail: boolean;

    @Column("varchar", { length: 30 })
    title: string;

    @Column("varchar", { length: 150, nullable: true })
    content: string;

    @Column("int")
    price: number;

    @Column("int")
    count: number;

    @Column("int")
    weight: number;

    @Column("varchar", { length: 500 })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => SubscriptionDishes, (subscriptionDishes) => subscriptionDishes.dishes)
    subscriptionDishes: SubscriptionDishes[];

    // @OneToMany(() => SubscriptionOnetime, (subscriptionOnetime) => subscriptionOnetime.dishes)
    // subscriptionOnetime: SubscriptionOnetime[];

    @OneToMany(() => OrderDishes, (orderDishes) => orderDishes.dishes)
    orderDishes: OrderDishes[];

    @ManyToOne(() => Shops, (shops) => shops.dishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "shopId", referencedColumnName: "shopId" })
    shops: Shops;
}
