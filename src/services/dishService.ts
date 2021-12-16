import ApiError from "@modules/apiError";
import httpStatus from "http-status";
import { infoTypes } from "infoTypes";
import { repository, dishPropertyCheck, dishTypeCheck } from "@modules/property";
import { DishRepo } from "@repository/dishRepo";

export const findShopDishes = async (shopId: number) => {
    if (isNaN(shopId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const dishRepo = repository(DishRepo);

    return await dishRepo.findShopDish(shopId);
};

export const findShopDish = async (shopId: number, dishId: number) => {
    if (isNaN(shopId) || isNaN(dishId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const dishRepo = repository(DishRepo);

    return await dishRepo.findOneDish(shopId, dishId);
};

export const createDish = (shopId: number, data: infoTypes.dish) => {
    if (!dishPropertyCheck || !dishTypeCheck || isNaN(shopId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const dishRepo = repository(DishRepo);

    dishRepo.createDish(shopId, data);
};

export const updateDish = (shopId: number, dishId: number, data: infoTypes.dish) => {
    if (!dishTypeCheck || isNaN(shopId) || isNaN(dishId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const dishRepo = repository(DishRepo);

    dishRepo.updateDish(shopId, dishId, data);
};

export const deleteDish = (shopId: number, dishId: number) => {
    if (isNaN(shopId) || isNaN(dishId)) throw new ApiError(httpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    const dishRepo = repository(DishRepo);

    dishRepo.deleteDish(shopId, dishId);
};
