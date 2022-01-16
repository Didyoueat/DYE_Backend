import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "@modules/api.error";
import httpStatus from "http-status";

const catchPrivilege =
    (fn: Function, permission?: { user?: boolean; shop?: boolean; admin?: boolean }) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .then(async () => {
                try {
                    const grade = jwt.decode(String(req.headers.access_token))["id"];

                    if ((grade === 0 && !permission.user) || (grade === 1 && !permission.shop)) {
                        throw new ApiError(httpStatus.FORBIDDEN, "권한이 없습니다.");
                    }

                    next();
                } catch (err) {
                    next(err);
                }
            })
            .catch((err) => next(err));
    };

export default catchPrivilege;
