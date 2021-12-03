import SequelizeConf from "sequelize";
import env from "@modules/env";
import Shops from "@models/shops";
import Users from "@models/users";
import Dishes from "@models/dishes";
import Subscriptions from "@models/subscriptions";
import Orders from "@models/orders";
import OrderDishes from "@models/orderDishes";
import SubscriptionDishes from "@models/subscriptionDishes";

const { username, password, database, host, port } = env.dbConfig;

export const sequelize = new SequelizeConf.Sequelize(database, username, password, {
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

const Table = {
    Shops: Shops(sequelize),
    Users: Users(sequelize),
    Dishes: Dishes(sequelize),
    Subscriptions: Subscriptions(sequelize),
    Orders: Orders(sequelize),
    OrderDishes: OrderDishes(sequelize),
    SubscriptionDishes: SubscriptionDishes(sequelize),
};

// hasMany
Table.Users.hasMany(Table.Subscriptions, { sourceKey: "userId", foreignKey: "userId" });
Table.Users.hasMany(Table.Orders, { sourceKey: "userId", foreignKey: "userId" });
Table.Shops.hasMany(Table.Dishes, { sourceKey: "shopId", foreignKey: "shopId" });
Table.Shops.hasMany(Table.Subscriptions, { sourceKey: "shopId", foreignKey: "shopId" });
Table.Shops.hasMany(Table.Orders, { sourceKey: "shopId", foreignKey: "shopId" });
Table.Subscriptions.hasMany(Table.OrderDishes, { sourceKey: "subscriptionId", foreignKey: "subscriptionId" });
Table.Subscriptions.hasMany(Table.SubscriptionDishes, { sourceKey: "subscriptionId", foreignKey: "subscriptionId" });
Table.Orders.hasMany(Table.OrderDishes, { sourceKey: "orderId", foreignKey: "orderId" });
Table.Orders.hasMany(Table.SubscriptionDishes, { sourceKey: "orderId", foreignKey: "orderId" });
Table.Dishes.hasMany(Table.OrderDishes, { sourceKey: "dishId", foreignKey: "dishId" });
Table.Dishes.hasMany(Table.SubscriptionDishes, { sourceKey: "dishId", foreignKey: "dishId" });

// belongsTo
Table.Subscriptions.belongsTo(Table.Users, { foreignKey: "userId" });
Table.Subscriptions.belongsTo(Table.Shops, { foreignKey: "shopId" });
Table.Orders.belongsTo(Table.Users, { foreignKey: "userId" });
Table.Orders.belongsTo(Table.Shops, { foreignKey: "shopId" });
Table.Dishes.belongsTo(Table.Shops, { foreignKey: "shopId" });
Table.OrderDishes.belongsTo(Table.Subscriptions, { foreignKey: "subscriptionId" });
Table.OrderDishes.belongsTo(Table.Orders, { foreignKey: "orderId" });
Table.OrderDishes.belongsTo(Table.Dishes, { foreignKey: "dishId" });
Table.SubscriptionDishes.belongsTo(Table.Subscriptions, { foreignKey: "subscriptionId" });
Table.SubscriptionDishes.belongsTo(Table.Orders, { foreignKey: "orderId" });
Table.SubscriptionDishes.belongsTo(Table.Dishes, { foreignKey: "dishId" });

export default Table;
