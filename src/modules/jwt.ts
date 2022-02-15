import jwt from "jsonwebtoken";
import env from "@modules/env";
import redisClient from "@modules/redis";
import tokenTypes from "tokenTypes";

const randomizationId = (requestId: number): number =>
    parseInt(String(Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000) + String(requestId), 10);

export const originId = (id: number): number => parseInt(String(id).substring(7), 10);

const JWT = {
    accessSign: (requestId: number, group: number) =>
        jwt.sign({ id: randomizationId(requestId), group: group }, env.jwtSecret.access, {
            algorithm: "HS256",
            expiresIn: "30m",
        }),

    refreshSign: async (requestId: number, group: number) => {
        const refresh = jwt.sign({}, env.jwtSecret.refresh, { algorithm: "HS256", expiresIn: "30d" });
        const decoded = jwt.decode(refresh);
        const groupName = group === 0 || group === 2 ? "user" : "shop";
        const client = await redisClient();

        await client.hSet(groupName + "_" + String(requestId), { token: refresh, iat: decoded["iat"] });
        await client.quit();

        return refresh;
    },

    accessVerify: (accessToken: string): tokenTypes.verify => {
        let decoded = null;
        try {
            decoded = jwt.verify(accessToken, env.jwtSecret.access);
            return { valid: true, decoded: decoded };
        } catch (err) {
            decoded = jwt.decode(accessToken);
            return { valid: false, decoded: decoded, message: err.message };
        }
    },

    refreshVerity: async (refreshToken: string, requestId: number, group: number): Promise<tokenTypes.verify> => {
        const client = await redisClient();
        const groupName = group === 0 || group === 2 ? "user" : "shop";
        const refresh = await client.hGetAll(groupName + "_" + String(requestId));
        await client.quit();

        try {
            const decoded = jwt.verify(refreshToken, env.jwtSecret.refresh);
            if (refresh.token === refreshToken && refresh.iat === String(decoded["iat"])) {
                return { valid: true };
            } else {
                return { valid: false, message: "유효하지 않는 토큰입니다." };
            }
        } catch (err) {
            return { valid: false, message: err.message };
        }
    },

    refreshDelete: async (requestId: number, group: number) => {
        const client = await redisClient();
        const groupName = group === 0 || group === 2 ? "user" : "shop";
        const del = await client.hDel(groupName + "_" + String(requestId), ["iat", "token"]);
        await client.quit();

        return del;
    },
};

export default JWT;
