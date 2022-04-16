import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";
import Users from "@entities/users";
import Shops from "@entities/shops";
import Subscriptions from "@entities/subscriptions";
import Orders from "@entities/orders";

@Entity("addresses")
export default class Addresses {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column("int", { nullable: true })
    userId: Number;

    @Column("int", { nullable: true })
    shopId: Number;

    @Column("varchar", { length: 100 })
    address: String;

    @Column("varchar", { length: 100 })
    addressDetail: String;

    @Column("varchar", { length: 20 })
    dong: String;

    @Column("double")
    latitude: String;

    @Column("double")
    longitude: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @ManyToOne(() => Users, (users) => users.addresses, {
        nullable: true,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "userId" })
    users: Users;

    @ManyToOne(() => Shops, (shops) => shops.addresses, {
        nullable: true,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "shopId" })
    shops: Shops;

    @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.addresses)
    subscriptions: Subscriptions[];

    @OneToMany(() => Orders, (orders) => orders.addresses)
    orders: Orders[];
}
