import { repository } from "@modules/property";
import { UserRepo } from "@repository/user.repository";
import { propertyCheck } from "@modules/property";
import infoTypes from "infoTypes";

export const findUser = async (userId: number) => {
    propertyCheck(userId);

    const userRepo = repository(UserRepo);

    return await userRepo.findUser(userId);
};

export const createUser = async (data: infoTypes.user) => {
    const userRepo = repository(UserRepo);

    await userRepo.createUser(data);

    return {};
};
