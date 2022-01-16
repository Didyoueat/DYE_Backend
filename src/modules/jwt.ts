import jwt from "jsonwebtoken";
import env from "@modules/env";
import redisClient from "@modules/redis";

const randomizationId = (userId: number): number =>
    parseInt(String(Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000) + String(userId), 10);

const JWT = {
    accessSign: (userId: number) =>
        jwt.sign({ id: randomizationId(userId) }, env.jwtSecret.access, { algorithm: "HS256", expiresIn: "1m" }),

    refreshSign: async (userId: string) => {
        const refresh = jwt.sign({}, env.jwtSecret.refresh, { algorithm: "HS256", expiresIn: "30d" });
        const decoded = jwt.verify(refresh, env.jwtSecret.refresh);
        const client = await redisClient();

        await client.hSet(userId, { token: refresh, iat: decoded["iat"] });
        await client.quit();

        return refresh;
    },

    accessVerify: (accessToken: string): { valid: boolean; decoded: string | jwt.JwtPayload; message?: string } => {
        let decoded = null;
        try {
            decoded = jwt.verify(accessToken, env.jwtSecret.access);
            return { valid: true, decoded: decoded };
        } catch (err) {
            decoded = jwt.decode(accessToken);
            return { valid: false, decoded: decoded, message: err.message };
        }
    },

    refreshVerity: async (refreshToken: string, userId: string): Promise<{ valid: boolean; message?: string }> => {
        const client = await redisClient();
        const refresh = await client.hGetAll(userId);
        await client.quit();

        try {
            const decoded = jwt.verify(refreshToken, env.jwtSecret.refresh);
            if (refresh.token === refreshToken && refresh.iat === String(decoded["iat"])) {
                return { valid: true };
            } else {
                return { valid: false, message: "유효하지 않은 토큰입니다." };
            }
        } catch (err) {
            return { valid: false, message: err.message };
        }
    },
};

export default JWT;
