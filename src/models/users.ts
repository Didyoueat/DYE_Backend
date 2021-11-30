import { Sequelize, Model, DataTypes } from "sequelize";

export interface userAttributes {
    userId: number;
    staff: boolean;
    loginStatus: string;
    email: string;
    password: string;
    name: string;
    age: number;
    gender: string;
    phone: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Users extends Model<userAttributes> {
    public userId: number;
    public staff: boolean;
    public loginStatus!: string;
    public email?: string;
    public password?: string;
    public name: string;
    public age: number;
    public gender: string;
    public phone: string;
    public address: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof Users {
    Users.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            staff: {
                type: DataTypes.BOOLEAN,
                // allowNull: false,
                defaultValue: false,
            },
            loginStatus: {
                type: DataTypes.STRING(10),
                // allowNull: true, 변경 필요할수도?
            },
            email: {
                type: DataTypes.STRING(100),
                // allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                // allowNull: true,
            },
            name: {
                type: DataTypes.STRING(20),
                // allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                // allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(10),
                // allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(20),
                // allowNull: false,
            },
            address: {
                type: DataTypes.STRING(255),
                // allowNull: false,
            },
        },
        {
            modelName: "Users",
            tableName: "users",
            sequelize,
            freezeTableName: true,
        }
    );
    return Users;
}
