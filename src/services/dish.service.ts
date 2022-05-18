import { DishRepo } from "@repository/dish.repository";
import { repository, propertyCheck } from "@modules/property";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import infoTypes from "infoTypes";

export const findShopDishes = async (shopId: number) => {
    // propertyCheck(shopId);

    const dishRepo = repository(DishRepo);
    const dishes = await dishRepo.findShopAllDishes(shopId);

    if (!dishes || dishes.length === 0) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return dishes;
};

export const findShopDish = async (shopId: number, dishId: number) => {
    // propertyCheck(shopId, dishId);

    const dishRepo = repository(DishRepo);
    const dish = await dishRepo.findDish(shopId, dishId);

    if (!dish) {
        errorGenerator(httpStatus.NOT_FOUND);
    }

    return dish;
};

export const createDish = async (shopId: number, data: infoTypes.dish) => {
    // propertyCheck(shopId, { data: data, type: "dish", mode: "create" });

    const dishRepo = repository(DishRepo);

    await dishRepo.createDish(shopId, data);
};

export const updateDish = async (shopId: number, dishId: number, data: infoTypes.dish) => {
    // propertyCheck(shopId, dishId, { data: data, type: "dish", mode: "update" });

    const dishRepo = repository(DishRepo);

    if ((await dishRepo.updateDish(shopId, dishId, data)).affected !== 1) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};

export const deleteDish = async (shopId: number, dishId: number) => {
    // propertyCheck(shopId, dishId);

    const dishRepo = repository(DishRepo);

    if ((await dishRepo.softDeleteDish(shopId, dishId)).affected !== 1) {
        errorGenerator(httpStatus.BAD_REQUEST);
    }
};
