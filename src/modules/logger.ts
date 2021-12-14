import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import env from "@modules/env";

const { combine, timestamp, printf } = winston.format;

const devOption = {
    debug(message: string) {
        if (env.nodeEnv !== "production") {
            debugLog.debug(message);
        }
    },

    console() {
        if (env.nodeEnv === "production") {
            infoLog.add(
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
                })
            );
        }
    },
};

const logFormat = printf((info) => {
    return `${info.timestamp} || [${info.level}] ${info.message}`;
});

const formatOption = combine(
    timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
);

const errorLog = winston.createLogger({
    level: "error",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/error",
            filename: "%DATE%.error.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const warnLog = winston.createLogger({
    level: "warn",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "warn",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/warn",
            filename: "%DATE%.warn.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const infoLog = winston.createLogger({
    level: "info",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/info",
            filename: "%DATE%.info.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const httpLog = winston.createLogger({
    level: "http",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "http",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/http",
            filename: "%DATE%.http.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const debugLog = winston.createLogger({
    level: "debug",
    format: formatOption,
    transports: [
        new winstonDaily({
            level: "debug",
            datePattern: "YYYY-MM-DD",
            dirname: "logs/debug",
            filename: "%DATE%.debug.log",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

const logger = {
    error(message: string) {
        errorLog.error(message);
        infoLog.error(message);
        devOption.debug(message);
    },

    warn(message: string) {
        warnLog.warn(message);
        infoLog.warn(message);
        devOption.debug(message);
    },

    info(message: string) {
        infoLog.info(message);
        devOption.debug(message);
    },

    http(message: string) {
        httpLog.http(message);
        devOption.debug(message);
    },

    stream: {
        write: (message: string) => {
            logger.http(message);
        },
    },
};

devOption.console();

export default logger;
