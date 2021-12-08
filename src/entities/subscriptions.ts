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
import { Users } from "@entities/users";
import { Shops } from "@entities/shops";
import { SubscriptionDishes } from "@entities/subscriptionDishes";

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

    @Column("boolean", { default: false })
    oneTime: boolean;

    @Column("varchar", { length: 10 })
    reciever: string;

    @Column("varchar", { length: 100 })
    address: string;

    @Column("varchar", { length: 20 })
    paymentState: string;

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

    @OneToMany(() => SubscriptionDishes, (subscriptionDishes) => subscriptionDishes.subscriptions)
    subscriptionDishes: Subscriptions[];

    @ManyToOne(() => Users, (users) => users.subscriptions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    users: Subscriptions;

    @ManyToOne(() => Shops, (shops) => shops.subscriptions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "shopId", referencedColumnName: "shopId" })
    shops: Subscriptions;
}
