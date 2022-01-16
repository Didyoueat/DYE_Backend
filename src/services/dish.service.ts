import { DishRepo } from "@repository/dish.repository";
import { repository, propertyCheck, addProperty } from "@modules/property";
import infoTypes from "infoTypes";

export const findShopDishes = async (shopId: number) => {
    propertyCheck(shopId);

    const dishRepo = repository(DishRepo);
    const dishes = await dishRepo.findShopDish(shopId);

    return {
        dishCount: dishes.length,
        dishes: dishes,
    };
};

export const findShopDish = async (shopId: number, dishId: number) => {
    propertyCheck(shopId, dishId);

    const dishRepo = repository(DishRepo);
    const dish = await dishRepo.findOneDish(shopId, dishId);

    return dish;
};

export const createDish = async (shopId: number, data: infoTypes.dish) => {
    const dishRepo = repository(DishRepo);

    propertyCheck(shopId, data);
    await dishRepo.createDish(shopId, data);
};

export const updateDish = async (shopId: number, dishId: number, data: infoTypes.dish) => {
    propertyCheck(shopId, dishId, addProperty(data, "dish"));

    const dishRepo = repository(DishRepo);

    await dishRepo.updateDish(shopId, dishId, data);
};

export const deleteDish = async (shopId: number, dishId: number) => {
    propertyCheck(shopId, dishId);

    const dishRepo = repository(DishRepo);

    await dishRepo.softDeleteOneDish(shopId, dishId);
};
