declare module "updateTypes" {
    namespace updateTypes {
        interface user {}

        interface shop {
            dayOff?: number;
            origin?: string;
            content?: string;
            officeHour?: string;
            temporaryDayStart?: Date;
            temporaryDayEnd?: Date;
        }

        interface dish {
            main?: boolean;
            title?: string;
            content?: string;
            price?: number;
            count?: number;
            weight?: number;
        }

        interface subscriptionDish {
            dishId: number;
            orderCount: number;
        }

        interface subscriptionShop {
            shopId: number;
            weekLabel: number;
            deliveryCost: number;
            dishes: Array<subscriptionDish>;
        }

        interface subscription {
            userId?: number;
            address?: string;
            receiver?: string;
            toShop?: string;
            toDelivery?: string;
            subsShop?: Array<subscriptionShop>;
        }

        interface order {
            orderState: string;
        }
    }

    export default updateTypes;
}
