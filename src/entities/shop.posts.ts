import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import Shops from "@entities/shops";

@Entity("shop_posts")
export default class ShopPosts {
    @PrimaryGeneratedColumn()
    shopPostId: number;

    @Column("varchar", { length: 100 })
    title: string;

    @Column("varchar", { length: 300 })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @ManyToOne(() => Shops, (shops) => shops.shopPosts, { nullable: false })
    @JoinColumn({ name: "shopId", referencedColumnName: "shopId" })
    shops: Shops;
}
