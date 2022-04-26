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
import Subscriptions from "@entities/subscriptions";
import SubscriptionDishes from "@entities/subscription.dishes";

@Entity("subscription_days")
export default class SubscriptionDays {
    @PrimaryGeneratedColumn()
    subscriptionDayId: number;

    @Column("int")
    subscriptionId: number;

    @Column("int")
    shopId: number;

    @Column("tinyint", { unsigned: true })
    weekLabel: number;

    @Column("int")
    deliveryCost: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => SubscriptionDishes, (subscriptionDishes) => subscriptionDishes.subscriptionDays)
    subscriptionDishes: SubscriptionDishes[];

    @ManyToOne(() => Subscriptions, (subscriptions) => subscriptions.subscriptionDays, {
        nullable: false,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "subscriptionId" })
    subscriptions: Subscriptions;

    @ManyToOne(() => Shops, (shops) => shops.subscriptionDays, { nullable: false })
    @JoinColumn({ name: "shopId" })
    shops: Shops;
}
