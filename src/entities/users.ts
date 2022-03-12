import {
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    OneToOne,
} from "typeorm";
import { Subscriptions } from "@entities/subscriptions";
import { Orders } from "@entities/orders";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column("boolean", { default: false })
    staff: boolean;

    @Column("varchar", { length: 20, nullable: true })
    loginState?: string;

    @Column("varchar", { length: 50, unique: true, nullable: true })
    email: string;

    @Column("varchar", { length: 100, nullable: true, select: false })
    password!: string;

    @Column("varchar", { length: 10, nullable: true })
    name: string;

    @Column("int", { nullable: true })
    age: number;

    @Column("varchar", { length: 10, nullable: true })
    gender: string;

    @Column("varchar", { length: 20, nullable: true })
    phone: string;

    @Column("varchar", { length: 100, nullable: true })
    address: string;

    @Column("varchar", { length: 20, nullable: true })
    paymentState: string;

    @Column("varchar", { length: 255, nullable: true, select: false })
    paymentKey: string;

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
}
