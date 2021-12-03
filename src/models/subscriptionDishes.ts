import { Sequelize, Model, DataTypes } from "sequelize";

export interface subscriptionDishAttributes {
    subscriptionDishId: number;
    subscriptionId: number;
    dishId: number;
    oneTime: boolean;
    main: boolean;
    title: string;
    content: string;
    price: number;
    count: number;
    weight: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SubscriptionDishes extends Model<subscriptionDishAttributes> implements subscriptionDishAttributes {
    public subscriptionDishId: number;
    public subscriptionId!: number;
    public dishId: number;
    public oneTime!: boolean;
    public main: boolean;
    public title: string;
    public content!: string;
    public price: number;
    public count: number;
    public weight: number;
    public image!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof SubscriptionDishes {
    SubscriptionDishes.init(
        {
            subscriptionDishId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            subscriptionId: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            dishId: {
                type: DataTypes.INTEGER,
                // allowNull: true,
            },
            oneTime: {
                type: DataTypes.BOOLEAN,
                // allowNull: true,
            },
            main: {
                type: DataTypes.TINYINT,
                // allowNull: false,
                defaultValue: false,
            },
            title: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                // allowNull: true,
            },
            price: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            count: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            weight: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            image: {
                type: DataTypes.BLOB,
                // allowNull: true,
            },
        },
        {
            modelName: "SubscriptionDishes",
            tableName: "subscription_dishes",
            sequelize,
            freezeTableName: true,
        }
    );
    return SubscriptionDishes;
}
