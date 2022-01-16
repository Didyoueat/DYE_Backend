import { Request, Response, NextFunction } from "express";
import JWT from "@modules/jwt";

const afterware = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
        .then(async (data) => {
            const requestId = req.body.requestId;
            const response = {
                access_token: String(req.headers.access_token),
                refresh_token: String(req.headers.refresh_token),
                is_changed: false,
            };

            if (req.body.changedRequire) {
                response.access_token = JWT.accessSign(requestId);
                response.refresh_token = await JWT.refreshSign(requestId);
                response.is_changed = true;
            }
            res.header(response).json(data).status(200);
        })
        .catch((err) => next(err));
};

export default afterware;
