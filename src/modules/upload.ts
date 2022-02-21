import { Request } from "express";
import AWS from "aws-sdk";
import multer = require("multer");
import multerS3 = require("multer-s3");
import env from "@modules/env";

const s3 = new AWS.S3({
    accessKeyId: env.awsConfig.accessKey,
    secretAccessKey: env.awsConfig.secretKey,
    region: env.awsConfig.region,
});

const filename = (req: any): string => {
    const now = new Date().getTime();
    const name = `${req.params.shopId}_${now}`;

    req.body.imageUrl = `https://didyoueat.s3.ap-northeast-2.amazonaws.com/dishes/${name}`;

    return name;
};

export default multer({
    storage: multerS3({
        s3: s3,
        bucket: env.awsConfig.bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            cb(null, `dishes/${filename(req)}`);
        },
    }),
});
