declare module "tableTypes" {
    export namespace tableTypes {
        interface tableId {
            user?: number | number[];
            shop?: number | number[];
            dish?: number | number[];
            subscription?: number | number[];
            subscriptionDish?: number | number[];
            subscriptionOnetime?: number | number[];
            order?: number | number[];
            orderDish?: number | number[];
        }
    }
}
