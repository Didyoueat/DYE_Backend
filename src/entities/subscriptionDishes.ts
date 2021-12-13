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

    @Column("varchar", { length: 255, nullable: true })
    imageUrl: string;

    @Column("boolean", { default: false })
    deleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => SubscriptionOnetime, (subscriptionOnetime) => subscriptionOnetime.subscriptionDishes)
    subscriptionOnetime: SubscriptionDishes[];

    @ManyToOne(() => Subscriptions, (subscriptions) => subscriptions.subscriptionDishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "subscriptionId", referencedColumnName: "subscriptionId" })
    subscriptions: SubscriptionDishes;

    @ManyToOne(() => Dishes, (dishes) => dishes.subscriptionDishes, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: SubscriptionDishes;
}
