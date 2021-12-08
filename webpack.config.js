const path = require("path");
const webpack = require("webpack");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const dotenv = require("dotenv");
const { NODE_ENV } = process.env;

const config = {
    production: {
        env: "./.env.prod",
        outputPath: "dist",
    },
    test: {
        env: "./.env.test",
        outputPath: "dist",
    },
    development: {
        env: "./.env.dev",
        outputPath: "dist",
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
