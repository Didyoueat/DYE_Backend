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
import { OrderDishes } from "./orderDishes";

@Entity("orders")
export class Orders {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column("int")
    userId: number;

    @Column("int")
    shopId: number;

    @Column("varchar", { length: 10 })
    orderState: string;

    @Column("tinyint", { unsigned: true })
    weekLabel: number;

    @Column("varchar", { length: 100 })
    address: string;

    @Column("varchar", { length: 50, nullable: true })
    toShop!: string;

    @Column("varchar", { length: 50, nullable: true })
    toDelivery!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => OrderDishes, (orderDishes) => orderDishes.orders)
    orderDishes: Orders[];

    @ManyToOne(() => Users, (users) => users.orders, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    users: Orders;

    @ManyToOne(() => Shops, (shops) => shops.orders, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "shopId", referencedColumnName: "shopId" })
    shops: Orders;
}
