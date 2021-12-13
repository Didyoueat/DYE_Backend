import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { SubscriptionDishes } from "@entities/subscriptionDishes";
import { Dishes } from "@entities/dishes";

@Entity("subscription_onetime")
export class SubscriptionOnetime {
    @PrimaryGeneratedColumn()
    subscriptionOnetimeId: number;

    @Column("int")
    subscriptionDishId: number;

    @Column("int")
    dishId: number;

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

    @Column("boolean", { default: false })
    deleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => SubscriptionDishes, (subscriptionDishes) => subscriptionDishes.subscriptionOnetime, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "subscriptionDishId", referencedColumnName: "subscriptionDishId" })
    subscriptionDishes: SubscriptionOnetime;

    @ManyToOne(() => Dishes, (dishes) => dishes.subscriptionOnetime, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: SubscriptionOnetime;
}
