import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    OneToOne,
} from "typeorm";
import Subscriptions from "@entities/subscriptions";
import Orders from "@entities/orders";
import Addresses from "@entities/addresses";
import Payments from "@entities/payments";
import Signs from "@entities/signs";

@Entity("users")
export default class Users {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column("int")
    subscriptionId: number;

    @Column("boolean", { default: false })
    staff: boolean;

    @Column("varchar", { length: 10, nullable: true })
    name: string;

    @Column("varchar", { length: 8, nullable: true })
    birth: string;

    @Column("varchar", { length: 10, nullable: true })
    gender: string;

    @Column("varchar", { length: 20, nullable: true })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToOne(() => Subscriptions, (subscriptions) => subscriptions.users)
    subscriptions: Subscriptions;

    @OneToMany(() => Orders, (orders) => orders.users)
    orders: Orders[];

    @OneToMany(() => Addresses, (addresses) => addresses.users)
    addresses: Addresses[];

    @OneToMany(() => Payments, (payments) => payments.users)
    payments: Payments[];

    @OneToMany(() => Signs, (signs) => signs.users)
    signs: Signs[];
}
