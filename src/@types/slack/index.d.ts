declare module "slackFormatType" {
    export namespace slackFormatType {
        interface Field {
            title: string;
            value: any;
            short?: boolean;
        }

        interface Block {
            type: string;
            text: any;
        }
    }
}
