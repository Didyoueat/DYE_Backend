import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from "typeorm";
import { VirtualColumn } from "@modules/decorator";
import Dishes from "@entities/dishes";
import Addresses from "@entities/addresses";
import ShopTemporaryDays from "@entities/shop.temporary.days";
import SubscriptionDays from "@entities/subscription.days";
import OrderDays from "@entities/order.days";

@Entity("shops")
export default class Shops {
    @PrimaryGeneratedColumn()
    shopId: number;

    @Column("varchar", { length: 30 })
    businessNumber: string;

    @Column("varchar", { length: 50 })
    businessName: string;

    @Column("varchar", { length: 20, nullable: true })
    businessPhone: string;

    @Column("varchar", { length: 100, select: false })
    password: string;

    @Column("tinyint", { unsigned: true, default: 0, nullable: true })
    dayOff: number;

    @Column("varchar", { length: 10, nullable: true })
    name: string;

    @Column("varchar", { length: 20, nullable: true, select: false })
    phone!: string;

    @Column("varchar", { length: 300, nullable: true })
    origin!: string;

    @Column("varchar", { length: 300, nullable: true })
    content!: string;

    @Column("varchar", { length: 255, nullable: true })
    imageUrl: string;

    @Column("varchar", { length: 11, nullable: true })
    officeHour!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => Dishes, (dishes) => dishes.shops)
    dishes: Dishes[];

    @OneToMany(() => Addresses, (addresses) => addresses.shops)
    addresses: Addresses[];

    @OneToMany(() => ShopTemporaryDays, (shopTemporaryDays) => shopTemporaryDays.shops)
    shopTemporaryDays: ShopTemporaryDays[];

    @OneToMany(() => SubscriptionDays, (subscriptionDays) => subscriptionDays.shops)
    subscriptionDays: SubscriptionDays[];

    @OneToMany(() => OrderDays, (orderDays) => orderDays.shops)
    orderDays: OrderDays[];

    @VirtualColumn()
    distance: number;
}
