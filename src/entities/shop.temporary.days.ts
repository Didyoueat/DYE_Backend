import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from "typeorm";
import Shops from "@entities/shops";

@Entity("shop_temporary_days")
export default class ShopTemporaryDays {
    @PrimaryGeneratedColumn()
    shopTemporaryDayId: Number;

    @Column("int")
    shopId: Number;

    @Column("boolean", { default: false })
    status: boolean;

    @Column("datetime")
    startDay: Date;

    @Column("datetime")
    endDay: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @ManyToOne(() => Shops, (shops) => shops.shopTemporaryDays, {
        nullable: false,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "shopId" })
    shops: Shops;
}
