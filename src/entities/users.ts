import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Subscriptions } from "@entities/subscriptions";
import { Orders } from "@entities/orders";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column("boolean", { default: false })
    staff: boolean;

    @Column("varchar", { length: 20, nullable: true })
    loginState!: string;

    @Column("varchar", { length: 50, nullable: true })
    email!: string;

    @Column("varchar", { length: 100, nullable: true })
    password!: string;

    @Column("varchar", { length: 10 })
    name: string;

    @Column("int")
    age: number;

    @Column("varchar", { length: 10 })
    gender: string;

    @Column("varchar", { length: 20 })
    phone: string;

    @Column("varchar", { length: 100 })
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.users)
    subscriptions: Users[];

    @OneToMany(() => Orders, (orders) => orders.users)
    orders: Users[];
}
