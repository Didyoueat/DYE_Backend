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

@Entity("addresses")
export default class Addresses {
    @PrimaryGeneratedColumn()
    addressId: Number;

    @Column("int", { default: null, nullable: true })
    userId: Number;

    @Column("int", { default: null, nullable: true })
    shopId: Number;

    @Column("boolean", { default: true })
    main: boolean;

    @Column("varchar", { length: 100 })
    address: String;

    @Column("varchar", { length: 100 })
    addressDetail: String;

    @Column("varchar", { length: 20 })
    sido: String;

    @Column("varchar", { length: 20, nullable: true })
    sigungu: String;

    // 동, 리
    @Column("varchar", { length: 20, nullable: true })
    bname: String;

    // 읍, 면
    @Column("varchar", { length: 20, nullable: true })
    bname1: String;

    @Column("double")
    latitude: number;

    @Column("double")
    longitude: number;

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
}
