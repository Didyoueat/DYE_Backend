import { EntityRepository, Repository } from "typeorm";
import infoTypes from "infoTypes";
import Users from "@entities/users";

@EntityRepository(Users)
export class UserRepo extends Repository<Users> {
    isExistUser = async (keyword?: { userId?: number; email?: string; phone?: string }) => {
        const user = await this.createQueryBuilder("users")
            .select()
            .where("users.userId = :userId OR users.email = :email OR users.phone = :phone", {
                userId: keyword.userId,
                email: keyword.email,
                phone: keyword.phone,
            })
            .getRawOne();

        return user;
    };

    findAllUser = () => {
        return this.createQueryBuilder("users").select().getMany();
    };

    findUser = (userId: number) => {
        return this.createQueryBuilder("users")
            .where("users.userId = :userId", { userId: userId })
            .getOne();
    };

    findDeletedUser = (userId: number) => {
        return this.createQueryBuilder()
            .select()
            .withDeleted()
            .where("userId = :userId", { userId: userId })
            .getOne();
    };

    createUser = async (data: infoTypes.user) => {
        return await this.createQueryBuilder("users").insert().values(data).execute();
    };

    softDeleteUser = async (userId: number) => {
        return await this.createQueryBuilder("users")
            .softDelete()
            .where("users.userId = :userId", { userId: userId })
            .execute();
    };

    deleteUser = async (userId: number) => {
        return await this.createQueryBuilder("users")
            .delete()
            .where("users.userId = :userId", { userId: userId })
            .execute();
    };
}
