import { Sequelize, Model, DataTypes } from "sequelize";

export interface orderDishAttributes {
    orderDishId: number;
    subscriptionId: number;
    orderId: number;
    dishId: number;
    main: boolean;
    title: string;
    content: string;
    price: number;
    count: number;
    weight: number;
    image: string;
}

export class OrderDishes extends Model<orderDishAttributes> implements orderDishAttributes {
    public orderDishId: number;
    public subscriptionId!: number;
    public orderId!: number;
    public dishId: number;
    public main: boolean;
    public title: string;
    public content!: string;
    public price: number;
    public count: number;
    public weight: number;
    public image!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof OrderDishes {
    OrderDishes.init(
        {
            orderDishId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            subscriptionId: {
                type: DataTypes.INTEGER,
                // allowNull: true,
            },
            orderId: {
                type: DataTypes.INTEGER,
                // allowNull: true,
            },
            dishId: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            main: {
                type: DataTypes.TINYINT,
                // allowNull: false,
                defaultValue: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            weight: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            image: {
                type: DataTypes.BLOB,
                allowNull: true,
            },
        },
        {
            modelName: "OrderDishes",
            tableName: "order_dishes",
            sequelize,
            freezeTableName: true,
        }
    );
    return OrderDishes;
}
