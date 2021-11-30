import { Sequelize, Model, DataTypes } from "sequelize";

export interface orderOneTimeDishAttributes {
    orderOneTimeDishId: number;
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

export class OrderOneTimeDishes extends Model<orderOneTimeDishAttributes> implements orderOneTimeDishAttributes {
    public orderOneTimeDishId: number;
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

export default function (sequelize: Sequelize): typeof OrderOneTimeDishes {
    OrderOneTimeDishes.init(
        {
            orderOneTimeDishId: {
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
            modelName: "OrderOneTimeDishes",
            tableName: "order_one_timedishes",
            sequelize,
            freezeTableName: true,
        }
    );
    return OrderOneTimeDishes;
}
