import { Sequelize, Model, DataTypes } from "sequelize";

export interface orderAttributes {
    orderId: number;
    userId: number;
    shopId: number;
    weekLabel: number;
    address: string;
    toShop: string;
    toDelivery: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Orders extends Model<orderAttributes> implements orderAttributes {
    public orderId: number;
    public userId: number;
    public shopId: number;
    public weekLabel: number;
    public address: string;
    public toShop!: string;
    public toDelivery!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Orders {
    Orders.init(
        {
            orderId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            shopId: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            weekLabel: {
                type: DataTypes.TINYINT.UNSIGNED,
                // allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                // allowNull: false,
                defaultValue: false,
            },
            toShop: {
                type: DataTypes.STRING,
                // allowNull: true,
            },
            toDelivery: {
                type: DataTypes.STRING,
                // allowNull: true,
            },
        },
        {
            modelName: "Orders",
            tableName: "orders",
            sequelize,
            freezeTableName: true,
        }
    );
    return Orders;
}
