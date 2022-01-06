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
import { Users } from "@entities/users";
import { Shops } from "@entities/shops";
import { SubscriptionDishes } from "@entities/subscription.dishes";

@Entity("subscriptions")
export class Subscriptions {
    @PrimaryGeneratedColumn()
    subscriptionId: number;

    @Column("int")
    userId: number;

    @Column("int")
    shopId: number;

    @Column("tinyint", { unsigned: true })
    weekLabel: number;

    @Column("varchar", { length: 10 })
    reciever: string;

    @Column("varchar", { length: 100 })
    address: string;

    @Column("int")
    deliveryCost: number;

    @Column("varchar", { length: 50, nullable: true })
    toShop!: string;

    @Column("varchar", { length: 50, nullable: true })
    toDelivery!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @OneToMany(() => SubscriptionDishes, (subscriptionDishes) => subscriptionDishes.subscriptions)
    subscriptionDishes: SubscriptionDishes[];

    @ManyToOne(() => Users, (users) => users.subscriptions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    users: Users;

    @ManyToOne(() => Shops, (shops) => shops.subscriptions, { nullable: false })
    @JoinColumn({ name: "shopId", referencedColumnName: "shopId" })
    shops: Shops;
}
