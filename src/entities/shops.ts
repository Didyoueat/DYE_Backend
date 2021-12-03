import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Dishes } from "@entities/dishes";
import { Subscriptions } from "@entities/subscriptions";
import { Orders } from "@entities/orders";

@Entity("shops")
export class Shops {
    @PrimaryGeneratedColumn()
    shopId: number;

    @Column("varchar", { length: 30 })
    businessNumber: string;

    @Column("varchar", { length: 50 })
    businessName: string;

    @Column("varchar", { length: 20 })
    businessPhone: string;

    @Column("varchar", { length: 100 })
    password: string;

    @Column("tinyint", { unsigned: true })
    dayOff: number;

    @Column("varchar", { length: 100 })
    address: string;

    @Column("float")
    latitude: number;

    @Column("float")
    longitude: number;

    @Column("varchar", { length: 20, nullable: true })
    phone!: string;

    @Column("varchar", { length: 300, nullable: true })
    origin!: string;

    @Column("varchar", { length: 255, nullable: true })
    imageUrl: string;

    @Column("datetime", { nullable: true })
    temporaryDayStart!: Date;

    @Column("datetime", { nullable: true })
    temporaryDayEnd!: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Dishes, (dishes) => dishes.shops)
    dishes: Shops[];

    @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.shops)
    subscriptions: Shops[];

    @OneToMany(() => Orders, (orders) => orders.shops)
    orders: Shops[];
}
