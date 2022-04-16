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
import Users from "@entities/users";
import Addresses from "@entities/addresses";
import OrderDays from "./order.days";

@Entity("orders")
export default class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    userId: number;

    @Column("int")
    addressId: number;

    @Column("varchar", { length: 10 })
    orderState: string;

    @Column("varchar", { length: 10 })
    reciever: string;

    @Column("varchar", { length: 10, nullable: true })
    paymentState: string;

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

    @OneToMany(() => OrderDays, (orderDays) => orderDays.orders)
    orderDays: OrderDays[];

    @ManyToOne(() => Users, (users) => users.orders, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    users: Users;

    @ManyToOne(() => Addresses, (addresses) => addresses.orders, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "addressId" })
    addresses: Addresses;
}
