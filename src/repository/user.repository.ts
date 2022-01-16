import { EntityRepository, Repository } from "typeorm";
import infoTypes from "infoTypes";
import { Users } from "@entities/users";

@EntityRepository(Users)
export class UserRepo extends Repository<Users> {
    findExistUser = (keyword?: { userId?: number; email?: string; phone?: string }) => {
        return this.createQueryBuilder("users")
            .select("users.userId")
            .where("users.userId = :userId OR users.email = :email OR users.phone = :phone", {
                userId: keyword.userId,
                email: keyword.email,
                phone: keyword.phone,
            })
            .getOne();
    };

    findOneUser = (userId: number) => {
        return this.createQueryBuilder("users").select().where("users.userId = :userId", { userId: userId }).getOne();
    };

    createUser = async (data: infoTypes.user) => {
        return await this.createQueryBuilder("users").insert().values(data).execute();
    };
}
