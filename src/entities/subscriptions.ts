import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    DeleteDateColumn,
} from "typeorm";
import { Users } from "@entities/users";
import { SubscriptionDays } from "@entities/subscription.days";

@Entity("subscriptions")
export class Subscriptions {
    @PrimaryGeneratedColumn()
    subscriptionId: number;

    @Column("int")
    userId: number;

    @Column("varchar", { length: 10 })
    receiver: string;

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

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => SubscriptionDays, (subscriptionDays) => subscriptionDays.subscriptions)
    subscriptionDays: SubscriptionDays[];

    @OneToOne(() => Users, (users) => users.subscriptions, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId", referencedColumnName: "userId" })
    users: Users;
}
