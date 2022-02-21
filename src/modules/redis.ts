import { createClient, RedisClientOptions } from "redis";
import env from "@modules/env";

const redisClient = async () => {
    const client = createClient({
        url: `redis://${env.awsConfig.redisHost}:${env.awsConfig.redisPort}`,
    });
    await client.connect();
    return client;
};

export default redisClient;
