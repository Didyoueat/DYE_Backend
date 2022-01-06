module.exports = {
    preset: "ts-jest",
    moduleNameMapper: {
        "@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
        "@routes/(.*)$": "<rootDir>/src/routes/$1",
        "@controllers/(.*)$": "<rootDir>/src/controllers/$1",
        "@services/(.*)$": "<rootDir>/src/services/$1",
        "@repository/(.*)$": "<rootDir>/src/repository/$1",
        "@entities/(.*)$": "<rootDir>/src/entities/$1",
        "@modules/(.*)$": "<rootDir>/src/modules/$1",
    },
};
