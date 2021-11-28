import * as Sequelize from "sequelize";

export interface shopAttributes {
    id: number;
    latitude: number;
    longitude: number;
}

export class Shop extends Sequelize.Model<shopAttributes> {
    id!: number;
    latitude!: number;
    longitude!: number;

    static initModel(sequelize: Sequelize.Sequelize) {
        Shop.init(
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                },
                latitude: {
                    type: Sequelize.DataTypes.FLOAT,
                    allowNull: false,
                },
                longitude: {
                    type: Sequelize.DataTypes.FLOAT,
                    allowNull: false,
                },
            },
            {
                modelName: "Shop",
                tableName: "shops",
                sequelize,
                freezeTableName: true,
            }
        );
        return Shop;
    }
    public static associations: {};
}
