import { Request, Response, NextFunction } from "express";
import JWT from "@modules/jwt";
import httpStatus from "http-status";

const originId = (id: number): string => String(id).substring(7);

const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const access = String(req.headers.access_token);
    const refresh = String(req.headers.refresh_token);
    const accessResult = JWT.accessVerify(access);
    req.body.requestId = originId(accessResult.decoded["id"]);

    if (!access || !refresh) {
        res.send("잘못된 요청입니다.").status(httpStatus.BAD_REQUEST);
    }

    if (accessResult.valid || accessResult.message === "jwt expired") {
        const refreshResult = await JWT.refreshVerity(refresh, req.body.requestId);
        if (refreshResult.valid) {
            req.body.changedRequire = accessResult.message ? true : false;
            return;
        } else res.send(refreshResult.message).status(httpStatus.UNAUTHORIZED);
    } else {
        res.send("권한이 없습니다.").status(httpStatus.UNAUTHORIZED);
    }
};

export default authorization;
