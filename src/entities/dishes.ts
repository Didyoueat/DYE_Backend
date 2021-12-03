import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Shops } from "@entities/shops";
import { SubscriptionDishes } from "@entities/subscriptionDishes";
import { OrderDishes } from "@entities/orderDishes";

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

    @Column("varchar", { length: 255, nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => SubscriptionDishes, (subscriptionDishes) => subscriptionDishes.dishes)
    subscriptionDishes: Dishes[];

    @OneToMany(() => OrderDishes, (orderDishes) => orderDishes.dishes)
    orderDishes: Dishes[];

    @ManyToOne(() => Shops, (shops) => shops.dishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "shopId", referencedColumnName: "shopId" })
    shops: Shops;
}
