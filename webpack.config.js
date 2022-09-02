const path = require("path");
const webpack = require("webpack");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const dotenv = require("dotenv");
const { NODE_ENV } = process.env;

const config = {
    production: {
        env: "./.env.prod",
        outputPath: "build",
    },
    test: {
        env: "./.env.test",
        outputPath: "build",
    },
    development: {
        env: "./.env.dev",
        outputPath: "build",
    },
};

console.log(config[NODE_ENV]);

dotenv.config({
    path: config[NODE_ENV].env,
});

const outputPath = config[NODE_ENV].outputPath;

module.exports = {
    entry: "./src/app.ts",
    target: "node",
    externals: [nodeExternals()],
    optimization: {
        minimize: false,
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, outputPath),
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@middlewares": path.resolve(__dirname, "./src/middlewares/"),
            "@routes": path.resolve(__dirname, "./src/routes/"),
            "@controllers": path.resolve(__dirname, "./src/controllers/"),
            "@services": path.resolve(__dirname, "./src/services/"),
            "@repository": path.resolve(__dirname, "./src/repository/"),
            "@entities": path.resolve(__dirname, "./src/entities/"),
            "@modules": path.resolve(__dirname, "./src/modules/"),
        },
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
    },
};
