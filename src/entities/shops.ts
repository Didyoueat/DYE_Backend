import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from "typeorm";
import { VirtualColumn } from "@modules/decorator";
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

    @Column("varchar", { length: 100, select: false })
    password: string;

    @Column("tinyint", { unsigned: true })
    dayOff: number;

    @Column("varchar", { length: 100 })
    address: string;

    @Column("double")
    latitude: number;

    @Column("double")
    longitude: number;

    @Column("varchar", { length: 10 })
    name: string;

    @Column("varchar", { length: 20, nullable: true, select: false })
    phone!: string;

    @Column("varchar", { length: 300, nullable: true })
    origin!: string;

    @Column("varchar", { length: 300, nullable: true })
    content!: string;

    @Column("varchar", { length: 500, nullable: true })
    imageUrl: string;

    @Column("varchar", { length: 11, nullable: true })
    officeHour!: string;

    @Column("datetime", { nullable: true })
    temporaryDayStart!: Date;

    @Column("datetime", { nullable: true })
    temporaryDayEnd!: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @OneToMany(() => Dishes, (dishes) => dishes.shops)
    dishes: Dishes[];

    @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.shops)
    subscriptions: Subscriptions[];

    @OneToMany(() => Orders, (orders) => orders.shops)
    orders: Orders[];

    @VirtualColumn()
    distance: number;
}
