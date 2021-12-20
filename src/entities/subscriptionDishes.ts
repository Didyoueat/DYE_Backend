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
import { Subscriptions } from "@entities/subscriptions";
import { Dishes } from "@entities/dishes";
import { SubscriptionOnetime } from "@entities/subscriptionOnetime";

@Entity("subscription_dishes")
export class SubscriptionDishes {
    @PrimaryGeneratedColumn()
    subscriptionDishId: number;

    @Column("int")
    subscriptionId: number;

    @Column("int")
    dishId: number;

    @Column("int", { default: null, nullable: true })
    oldSubscriptionDishId: number;

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

    @Column("varchar", { length: 500, nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @OneToMany(() => SubscriptionOnetime, (subscriptionOnetime) => subscriptionOnetime.subscriptionDishes)
    subscriptionOnetime: SubscriptionOnetime[];

    @ManyToOne(() => Subscriptions, (subscriptions) => subscriptions.subscriptionDishes, {
        nullable: false,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "subscriptionId", referencedColumnName: "subscriptionId" })
    subscriptions: Subscriptions;

    @ManyToOne(() => Dishes, (dishes) => dishes.subscriptionDishes, { nullable: false })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: Dishes;
}
