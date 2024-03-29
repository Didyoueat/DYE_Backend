import { Request, Response, NextFunction } from "express";
import JWT, { originId } from "@modules/jwt";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";

const authorization = async (req: Request, res: Response) => {
    // todo: 쿠키로 파싱해야함. 현재는 헤더에 key value로 들어오는 중
    if (!req.headers.access_token || !req.headers.refresh_token) {
        errorGenerator(httpStatus.UNAUTHORIZED);
    }

    const access = String(req.headers.access_token);
    const refresh = String(req.headers.refresh_token);
    const accessResult = JWT.accessVerify(access);

    if (!accessResult.valid && accessResult.message !== "jwt expired") {
        errorGenerator(httpStatus.UNAUTHORIZED);
    }

    const refreshResult = await JWT.refreshVerity(
        refresh,
        originId(accessResult.decoded["id"]),
        accessResult.decoded["group"]
    );

    if (refreshResult.valid && (accessResult.valid || accessResult.message === "jwt expired")) {
        req.body.requestId = originId(accessResult.decoded["id"]);
        req.body.group = accessResult.decoded["group"];
        req.body.changedRequire = accessResult.message === "jwt expired" ? true : false;
        return {
            requestId: parseInt(req.body.requestId, 10),
            group: parseInt(req.body.group, 10),
        };
    } else {
        errorGenerator(httpStatus.UNAUTHORIZED);
    }
};

export default authorization;
