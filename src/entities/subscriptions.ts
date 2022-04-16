import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
    DeleteDateColumn,
} from "typeorm";
import Users from "@entities/users";
import Addresses from "@entities/addresses";
import Payments from "@entities/payments";
import SubscriptionDays from "@entities/subscription.days";

@Entity("subscriptions")
export default class Subscriptions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    userId: number;

    @Column("int")
    addressId: number;

    @Column("int")
    paymentId: number;

    @Column("varchar", { length: 10 })
    receiver: string;

    @Column("varchar", { length: 50, nullable: true })
    toShop!: string;

    @Column("varchar", { length: 50, nullable: true })
    toDelivery!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => SubscriptionDays, (subscriptionDays) => subscriptionDays.subscriptions)
    subscriptionDays: SubscriptionDays[];

    @OneToOne(() => Users, (users) => users.subscriptions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    users: Users;

    @ManyToOne(() => Addresses, (addresses) => addresses.subscriptions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "addressId" })
    addresses: Addresses;

    @ManyToOne(() => Payments, (payments) => payments.subscriptions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "paymentId" })
    payments: Payments;
}
