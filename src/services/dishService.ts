import { DishRepo } from "@repository/dishRepo";
import { repository, propertyCheck, addProperty } from "@modules/property";
import { infoTypes } from "infoTypes";

export const findShopDishes = async (shopId: number) => {
    propertyCheck(shopId);

    const dishRepo = repository(DishRepo);

    return await dishRepo.findShopDish(shopId);
};

export const findShopDish = async (shopId: number, dishId: number) => {
    propertyCheck(shopId, dishId);

    const dishRepo = repository(DishRepo);

    return await dishRepo.findOneDish(shopId, dishId);
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

    await dishRepo.deleteDish(shopId, dishId);
};
