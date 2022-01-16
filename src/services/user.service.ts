import ApiError from "@modules/api.error";
import httpStatus from "http-status";
import { repository } from "@modules/property";
import { UserRepo } from "@repository/user.repository";
import { propertyCheck, addProperty } from "@modules/property";
import infoTypes from "infoTypes";

export const findOneUser = async (userId: number) => {
    propertyCheck(userId);

    const userRepo = repository(UserRepo);
    return await userRepo.findOneUser(userId);
};

export const createUser = async (data: infoTypes.user) => {
    propertyCheck(addProperty(data, "user"));

    const userRepo = repository(UserRepo);

    await userRepo.createUser(data);

    return {};
};
