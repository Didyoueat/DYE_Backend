import { Request, Response, NextFunction } from "express";
import ApiError from "@modules/apiError";
import logger from "@modules/logger";
import env from "@modules/env";
import httpStatus from "http-status";

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(err instanceof ApiError)) {
        const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, err.stack);
    }
    next(error);
};

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message, stack } = err;

    const response: { code: number; message: string; stack: string } = {
        code: statusCode,
        message,
        stack: undefined,
    };

    if (env.nodeEnv === "development") response.stack = err.stack;

    logger.error(stack);

    res.status(statusCode).send(response);
};

export const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};
