import { Sequelize, Model, DataTypes } from "sequelize";

export interface subscriptionAttributes {
    subscriptionId: number;
    userId: number;
    shopId: number;
    weekLabel: number;
    oneTime: boolean;
    address: string;
    toShop: string;
    toDelivery: string;
}

export class Subscriptions extends Model<subscriptionAttributes> implements subscriptionAttributes {
    public subscriptionId: number;
    public userId: number;
    public shopId: number;
    public weekLabel: number;
    public oneTime: boolean;
    public address: string;
    public toShop!: string;
    public toDelivery!: string;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Subscriptions {
    Subscriptions.init(
        {
            subscriptionId: {
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
            oneTime: {
                type: DataTypes.TINYINT,
                // allowNull: false,
                defaultValue: false,
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
            modelName: "Subscriptions",
            tableName: "subscriptions",
            sequelize,
            freezeTableName: true,
        }
    );
    return Subscriptions;
}
