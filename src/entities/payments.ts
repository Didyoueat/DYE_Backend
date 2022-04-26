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
import Subscriptions from "@entities/subscriptions";

@Entity("payments")
export default class Payments {
    @PrimaryGeneratedColumn()
    paymentId: Number;

    @Column("int")
    userId: Number;

    @Column("varchar", { length: 10 })
    paymentState: String;

    @Column("varchar", { length: 100 })
    paymentKeyA: String;

    @Column("varchar", { length: 100 })
    paymentKeyB: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @OneToMany(() => Subscriptions, (subscriptions) => subscriptions.payments)
    subscriptions: Subscriptions[];

    @ManyToOne(() => Users, (users) => users.payments, {
        nullable: false,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "userId" })
    users: Users;
}
