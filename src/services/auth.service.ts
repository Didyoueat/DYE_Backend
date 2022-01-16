import axios from "axios";
import ApiError from "@modules/api.error";
import httpStatus from "http-status";
import { propertyCheck, repository } from "@modules/property";
import { UserRepo } from "@repository/user.repository";
import JWT from "@modules/jwt";

export const accessKakaoInfo = async (kakaoToken: string) => {
    const kakaoInfo = await axios("https://kapi.kakao.com/v2/user/me", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    });
    const userRepo = repository(UserRepo);
    const user = await userRepo.findExistUser({ email: kakaoInfo.data.kakao_account.email });

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "존재하지 않는 회원 입니다.");
    }

    return user;
};

export const createToken = async (userId: number) => {
    propertyCheck(userId);

    const userRepo = repository(UserRepo);
    const user = await userRepo.findExistUser({ userId: userId });

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "존재하지 않는 회원 입니다.");
    }

    return {
        access_token: JWT.accessSign(userId),
        refresh_token: await JWT.refreshSign(String(userId)),
    };
};

export const verityToken = async (access: string, refresh: string, userId: string) => {
    return {
        access: JWT.accessVerify(access),
        refresh: await JWT.refreshVerity(refresh, userId),
    };
};
