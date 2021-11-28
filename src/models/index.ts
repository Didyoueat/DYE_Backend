import SequelizeConf from "sequelize";
import env from "@modules/env";
import { Shop } from "@models/shops";
import type { shopAttributes } from "@models/shops";

const { username, password, database, host, port } = env.dbConfig;

const sequelize = new SequelizeConf.Sequelize(database, username, password, {
    host: host,
    dialect: "mysql",
    port,
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        freezeTableName: true,
    },
    timezone: "+09:00",
    logQueryParameters: env.nodeEnv === "development",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.log("Unable to connect to the database:", err);
    });

export { sequelize, Shop };

export type { shopAttributes };

export function Sequelize() {
    Shop.initModel(sequelize);
    return sequelize;
}
