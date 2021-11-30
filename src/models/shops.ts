import { Sequelize, Model, DataTypes, Association } from "sequelize";

export interface shopAttributes {
    shopId: number;
    businessNumber: string;
    businessName: string;
    businessPhone: string;
    password: string;
    dayOff: number;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    origin: string;
    temporaryDayStart: Date;
    temporaryDayEnd: Date;
}

export class Shops extends Model<shopAttributes> implements shopAttributes {
    public shopId: number;
    public businessNumber: string;
    public businessName: string;
    public businessPhone: string;
    public password: string;
    public dayOff: number;
    public address: string;
    public latitude: number;
    public longitude: number;
    public phone!: string;
    public origin!: string;
    public temporaryDayStart!: Date;
    public temporaryDayEnd!: Date;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Shops {
    Shops.init(
        {
            shopId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            businessNumber: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            businessName: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            businessPhone: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            dayOff: {
                type: DataTypes.TINYINT.UNSIGNED,
                // allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            latitude: {
                type: DataTypes.FLOAT,
                // allowNull: false,
            },
            longitude: {
                type: DataTypes.FLOAT,
                // allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                // allowNull: true,
            },
            origin: {
                type: DataTypes.TEXT,
                // allowNull: true,
            },
            temporaryDayStart: {
                type: DataTypes.DATE,
                // allowNull: true,
            },
            temporaryDayEnd: {
                type: DataTypes.DATE,
                // allowNull: true,
            },
        },
        {
            modelName: "Shops",
            tableName: "shops",
            sequelize,
            freezeTableName: true,
        }
    );
    return Shops;
}
