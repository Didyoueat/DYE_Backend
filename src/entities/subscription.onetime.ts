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
import { SubscriptionDishes } from "@entities/subscription.dishes";
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

    @Column("varchar", { length: 500, nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @ManyToOne(() => SubscriptionDishes, (subscriptionDishes) => subscriptionDishes.subscriptionOnetime, {
        nullable: false,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "subscriptionDishId", referencedColumnName: "subscriptionDishId" })
    subscriptionDishes: SubscriptionDishes;

    @ManyToOne(() => Dishes, (dishes) => dishes.subscriptionOnetime, { nullable: false })
    @JoinColumn({ name: "dishId", referencedColumnName: "dishId" })
    dishes: Dishes;
}
