import { Request, Response, NextFunction } from "express";
import { ApiError, errorGenerator } from "@modules/api.error";
import logger from "@modules/logger";
import env from "@modules/env";
import slack from "@modules/slack";
import httpStatus from "http-status";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
};

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

    const response: { code: number; message: string; stack?: string } = {
        code: statusCode,
        message: message,
    };

    if (env.nodeEnv === "development") {
        response.stack = err.stack;
        if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
            logger.error(stack);
        } else {
            logger.warn(stack);
        }
    } else {
        if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
            response.message = "서버 오류";
            slack({ log: logger.error(stack), statusCode, stack, message });
        } else {
            logger.warn(stack);
        }
    }

    res.status(statusCode).send(response);
};
