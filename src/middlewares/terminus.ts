import { Request, Response, NextFunction } from "express";
import JWT from "@modules/jwt";

const terminus = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
        .then(async (data) => {
            const requestId: number = req.body.requestId;
            const group: number = req.body.group;
            const response = {
                access_token: String(req.headers.access_token),
                refresh_token: String(req.headers.refresh_token),
                is_changed: false,
            };

            if (req.body.changedRequire) {
                response.access_token = JWT.accessSign(requestId, group);
                response.refresh_token = await JWT.refreshSign(requestId, group);
                response.is_changed = true;
            }

            if (response.is_changed) {
                if (group === 1) {
                    res.cookie("access_token", response.access_token, { httpOnly: true, secure: true, sameSite: "none" });
                    res.cookie("refresh_token", response.refresh_token, { httpOnly: true, secure: true, sameSite: "none" });
                } else {
                    res.header(response);
                }
            }

            res.status(200).json(data);
        })
        .catch((err) => next(err));
};

export default terminus;
