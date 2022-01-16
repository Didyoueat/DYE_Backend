import { createClient } from "redis";

const redisClient = async () => {
    const client = createClient();
    await client.connect();
    return client;
};

export default redisClient;
