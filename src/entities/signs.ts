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
import Users from "@entities/users";

@Entity("signs")
export default class Signs {
    @PrimaryGeneratedColumn()
    signId: Number;

    @Column("int", { default: null, nullable: true })
    userId: Number;

    @Column("varchar", { length: 20 })
    loginStatus: string;

    @Column("varchar", { length: 50, nullable: true, default: null })
    email?: string;

    @Column("varchar", { length: 255, nullable: true, default: null })
    uid?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, select: false })
    deletedAt: Date;

    @ManyToOne(() => Users, (users) => users.signs, {
        nullable: true,
        onDelete: "CASCADE",
        cascade: true,
    })
    @JoinColumn({ name: "userId" })
    users: Users;
}
