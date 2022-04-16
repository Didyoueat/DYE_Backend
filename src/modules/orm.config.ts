import { createConnection, ConnectionOptions, getConnection } from "typeorm";
import env from "@modules/env";
import Users from "@entities/users";
import Shops from "@entities/shops";
import Dishes from "@entities/dishes";
import Subscriptions from "@entities/subscriptions";
import SubscriptionDays from "@entities/subscription.days";
import SubscriptionDishes from "@entities/subscription.dishes";
import Orders from "@entities/orders";
import OrderDays from "@entities/order.days";
import OrderDishes from "@entities/order.dishes";
import Addresses from "@entities/addresses";
import Payments from "@entities/payments";
import ShopTemporaryDays from "@entities/shop.temporary.days";

const defaultOrmConfig: ConnectionOptions = {
    type: "mysql",
    host: env.dbConfig.host,
    port: env.dbConfig.port,
    username: env.dbConfig.username,
    password: env.dbConfig.password,
    database: env.dbConfig.database,
    charset: "utf8mb4_general_ci",
    timezone: "+09:00",
    synchronize: false,
    logging: ["error"],
    logger: "file",
    maxQueryExecutionTime: 2000,
    entities: [
        Users,
        Shops,
        Addresses,
        Payments,
        ShopTemporaryDays,
        Dishes,
        Subscriptions,
        SubscriptionDays,
        SubscriptionDishes,
        Orders,
        OrderDays,
        OrderDishes,
    ],
};

const databaseLoader = async (ormConfig: ConnectionOptions = defaultOrmConfig) =>
    await createConnection(ormConfig)
        .then(() => console.log("🚀 DB Connected"))
        .catch((err) => console.log(err));

export const clearDatabase = () => getConnection().close();

export default databaseLoader;
