import axios from "axios";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";
import { propertyCheck, repository } from "@modules/property";
import { UserRepo } from "@repository/user.repository";
import { ShopRepo } from "@repository/shop.repository";
import JWT, { originId } from "@modules/jwt";

export const accessKakaoInfo = async (kakaoToken: string) => {
    return await axios("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    })
        .then(async (kakaoInfo) => {
            // await axios("https://kapi.kakao.com/v1/user/logout", {
            //     method: "POST",
            //     headers: {
            //         Authorization: `Bearer ${kakaoToken}`,
            //     },
            // });

            const userRepo = repository(UserRepo);
            const user = await userRepo.isExistUser({ email: kakaoInfo.data.kakao_account.email });

            if (!user) {
                errorGenerator(httpStatus.UNAUTHORIZED);
            }

            return user;
        })
        .catch((err) => {
            errorGenerator(httpStatus.UNAUTHORIZED, err.response.data.msg);
        });
};

// export const accessShopInfo = async (businessNumber: string, password: string)

// export const createToken = async ({ userId: number }) => {
//     propertyCheck(userId);

//     const userRepo = repository(UserRepo);
//     const user = await userRepo.isExistUser({ userId: userId });

//     if (!user) {
//         const shopRepo = repository(ShopRepo);
//         const shop = await shopRepo.isExistShop();
//         throw new ApiError(httpStatus.UNAUTHORIZED, "존재하지 않는 회원 입니다.");
//     }

//     return {
//         access_token: JWT.accessSign(userId),
//         refresh_token: await JWT.refreshSign(userId),
//     };
// };

export const verityToken = async (accessToken: string, refreshToken: string) => {
    const access = JWT.accessVerify(accessToken);
    const requestId = originId(access.decoded.id);
    const group = access.decoded.group;
    const refresh = await JWT.refreshVerity(refreshToken, requestId, group);

    return {
        access: access,
        refresh: refresh,
    };
};

export const signOut = async (requestId: number, group: number) => {
    if ((await JWT.refreshDelete(requestId, group)) === 0) {
        errorGenerator(httpStatus.UNAUTHORIZED);
    }
};
