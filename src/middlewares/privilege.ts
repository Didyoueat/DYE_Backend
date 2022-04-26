import { Request, Response, NextFunction } from "express";
import { errorGenerator } from "@modules/api.error";
import httpStatus from "http-status";

const catchPrivilege =
    (fn: Function, permission?: { user?: boolean; shop?: boolean; all?: boolean }) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .then(async (data) => {
                next();
                // try {
                //     if (!permission.all && ((data.grade === 0 && !permission.user) || (data.grade === 1 && !permission.shop))) {
                //         errorGenerator(httpStatus.FORBIDDEN)
                //     }
                //     next();
                // } catch (err) {
                //     next(err);
                // }
            })
            .catch((err) => next(err));
    };

export default catchPrivilege;
