import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    DeleteDateColumn,
} from "typeorm";
import { Users } from "@entities/users";
import { Shops } from "@entities/shops";
import { OrderDays } from "./order.days";

@Entity("orders")
export class Orders {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column("int")
    userId: number;

    @Column("varchar", { length: 10 })
    orderState: string;

    @Column("varchar", { length: 10 })
    reciever: string;

    @Column("varchar", { length: 100 })
    address: string;

    @Column("varchar", { length: 20, nullable: true })
    paymentState: string;

    @Column("varchar", { length: 50, nullable: true })
    toShop!: string;

    @Column("varchar", { length: 50, nullable: true })
    toDelivery!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @OneToMany(() => OrderDays, (orderDays) => orderDays.orders)
    orderDays: OrderDays[];

    @ManyToOne(() => Users, (users) => users.orders, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    users: Users;
}
