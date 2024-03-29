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
import SubscriptionDays from "@entities/subscription.days";
import Dishes from "@entities/dishes";
// import { SubscriptionOnetime } from "@entities/subscription.onetime";

@Entity("subscription_dishes")
export default class SubscriptionDishes {
    @PrimaryGeneratedColumn()
    subscriptionDishId: number;

    @Column("int")
    subscriptionDayId: number;

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

    @Column("varchar", { length: 500, nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    // @OneToMany(() => SubscriptionOnetime, (subscriptionOnetime) => subscriptionOnetime.subscriptionDishes)
    // subscriptionOnetime: SubscriptionOnetime[];

    @ManyToOne(() => SubscriptionDays, (subscriptionDays) => subscriptionDays.subscriptionDishes, {
        nullable: false,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "subscriptionDayId", referencedColumnName: "subscriptionDayId" })
    subscriptionDays: SubscriptionDays;

    @ManyToOne(() => Dishes, (dishes) => dishes.subscriptionDishes, { nullable: false })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: Dishes;
}
