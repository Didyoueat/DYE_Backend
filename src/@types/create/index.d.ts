declare module "createTypes" {
    namespace createTypes {
        interface user {}

        interface shop {
            businessName: string;
            businessNUmber: string;
            password: string;
            address: string;
            latitude: number;
            longitude: number;
            name: string;
            phone: string;
        }

        interface dish {
            main: boolean;
            title: string;
            content?: string;
            price: number;
            count: number;
            weight: number;
        }

        interface subscriptionDish {
            dishId: number;
            orderCount: number;
        }

        interface subscriptionDay {
            shopId: number;
            weekLabel: number;
            deliveryCost: number;
            subscriptionDishes?: Array<subscriptionDish>;
        }

        interface subscription {
            address: string;
            receiver: string;
            toShop?: string;
            toDelivery?: string;
            subscriptionDays?: Array<subscriptionDay>;
        }
    }

    export default createTypes;
}
