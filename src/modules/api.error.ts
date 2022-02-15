import httpStatus from "http-status";

Error.stackTraceLimit = 10;

export class ApiError extends Error {
    statusCode: number;
    isFatal: boolean;
    constructor(statusCode: number, message: string, option?: { stack?: string; isFatal: boolean }) {
        super(message);
        this.statusCode = statusCode;
        if (option) {
            this.isFatal = option.isFatal === undefined ? false : option.isFatal;
            if (option.stack) {
                this.stack = option.stack;
            } else {
                Error.captureStackTrace(this, this.constructor);
            }
        } else {
            this.isFatal = false;
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const errorGenerator = (httpCode: number, msg?: string) => {
    const badRequest = httpCode === httpStatus.BAD_REQUEST;
    const unAuthorized = httpCode === httpStatus.UNAUTHORIZED;
    const forbidden = httpCode === httpStatus.FORBIDDEN;
    const notFound = httpCode === httpStatus.NOT_FOUND;
    const message = msg
        ? msg
        : badRequest
        ? "잘못된 요청입니다."
        : unAuthorized
        ? "인증에 실패했습니다."
        : forbidden
        ? "권한이 없습니다."
        : notFound
        ? "없는 데이터를 참조하였거나 존재하지 않는 API 입니다."
        : "";

    throw new ApiError(httpCode, message);
};
