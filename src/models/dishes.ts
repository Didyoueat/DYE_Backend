import { Sequelize, Model, DataTypes, Association } from "sequelize";

export interface dishAttributes {
    dishId: number;
    shopId: number;
    main: boolean;
    thumbnail: boolean;
    title: string;
    content: string;
    price: number;
    count: number;
    weight: number;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Dishes extends Model<dishAttributes> implements dishAttributes {
    public dishId: number;
    public shopId: number;
    public main: boolean;
    public thumbnail: boolean;
    public title: string;
    public content!: string;
    public price: number;
    public count: number;
    public weight: number;
    public image!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Dishes {
    Dishes.init(
        {
            dishId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            shopId: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            main: {
                type: DataTypes.BOOLEAN,
                // allowNull: false,
            },
            thumbnail: {
                type: DataTypes.BOOLEAN,
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
            modelName: "Dishes",
            tableName: "dishes",
            sequelize,
            freezeTableName: true,
        }
    );
    return Dishes;
}
