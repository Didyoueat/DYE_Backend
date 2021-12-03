import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Subscriptions } from "@entities/subscriptions";
import { Dishes } from "@entities/dishes";

@Entity("subscription_dishes")
export class SubscriptionDishes {
    @PrimaryGeneratedColumn()
    subscriptionDishId: number;

    @Column("int")
    subscriptionId: number;

    @Column("int")
    dishId: number;

    @Column("boolean", { default: false })
    oneTime: boolean;

    @Column("boolean", { default: false })
    main: boolean;

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

    @ManyToOne(() => Subscriptions, (subscriptions) => subscriptions.subscriptionDishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "subscriptionId", referencedColumnName: "subscriptionId" })
    subscriptions: SubscriptionDishes;

    @ManyToOne(() => Dishes, (dishes) => dishes.subscriptionDishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: SubscriptionDishes;
}
