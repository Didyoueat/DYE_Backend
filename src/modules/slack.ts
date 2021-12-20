import winston from "winston";
import axios from "axios";
import env from "@modules/env";
import logger from "@modules/logger";
import datetime from "@modules/datetime";
import { slackFormatType } from "slackFormatType";

type IError = {
    log: winston.Logger;
    statusCode: number;
    stack: string;
    message: string;
};

const SLACK_API = "https://hooks.slack.com/services/";

class SlackTextBuilder {
    color: string;
    pretext: string;
    fields: Array<slackFormatType.Field>;
    blocks: Array<slackFormatType.Block>;

    constructor({ color, pretext }: Partial<{ color: string; pretext: string }>) {
        this.color = color || "#2eb886";
        this.pretext = pretext || "";
        this.fields = [];
        this.blocks = [];
    }

    addField(field: slackFormatType.Field) {
        if (field.short === undefined) {
            field.short = true;
        }
        this.fields.push(field);
        return this;
    }

    addBlock(block: any) {
        this.blocks.push(block);
        return this;
    }

    toJSON() {
        return {
            as_user: false,
            attachments: [
                {
                    color: env.nodeEnv === "production" ? "#FF0000" : this.color,
                    pretext: this.pretext,
                    fields: this.fields,
                },
            ],
            blocks: this.blocks,
        };
    }
}

const errorFormat = ({ log, statusCode, stack, message }: IError) => {
    const builder = new SlackTextBuilder({});
    builder
        .addField({
            title: "APP_NAME",
            value: `\`Did you eat?\``,
        })
        .addField({
            title: "ENV_TYPE",
            value: `\`${env.nodeEnv}\``,
        })
        .addField({
            title: "TIME_STAMP",
            value: `\`${datetime(new Date())}\``,
        })
        .addField({
            title: "SOURCE",
            value: `\`${log["_readableState"].pipes.dirname}\``,
        })
        .addField({
            title: "STATUS_CODE",
            value: `\`${statusCode}\``,
        })
        .addBlock({
            type: "header",
            text: {
                type: "plain_text",
                text: message,
                emoji: true,
            },
        })
        .addBlock({
            type: "section",
            text: {
                type: "mrkdwn",
                text: `\`\`\`${stack}\`\`\``,
            },
        });
    return builder.toJSON();
};

const slack = (error: IError) => {
    const body = errorFormat(error);
    axios.post(`${SLACK_API}${env.slackWebhook}`, body).catch((err) => logger.error(err));
};

export default slack;
