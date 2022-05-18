declare module "infoTypes" {
    namespace infoTypes {
        interface user {
            loginStatus: string;
            email: string;
            name: string;
            age: number;
            gender: string;
            phone: string;
            address: string;
        }

        interface shop {
            businessName: string;
            businessNumber: string;
            businessPhone: string;
            dayOff: number;
            password: string;
            address: string;
            latitude: number;
            longitude: number;
            name: string;
            phone: string;
            origin: string | null;
            content: string | null;
            imageUrl?: string | null;
            officeHour: string;
            temporaryDayStart: Date | null;
            temporaryDayEnd: Date | null;
        }

        interface dish {
            shopId: number;
            main: boolean;
            thumbnail: boolean;
            title: string;
            content: string | null;
            price: number;
            count: number;
            weight: number;
            imageUrl?: string;
        }

        interface dishInCart {
            dishId: number;
            orderCount: number;
        }

        interface subscriptionDish {
            subscriptionId: number;
            dishId: number;
            oldSubscriptionDishId?: number;
            oneTime: boolean;
            main: boolean;
            title: string;
            price: number;
            weight: number;
            orderCount: number;
            imageUrl?: string;
        }

        interface subscription {
            userId: number;
            shopId: number;
            weekLabel: number;
            receiver: string;
            address: string;
            deliveryCost: number;
            toShop: string | null;
            toDelivery: string | null;
            dishes?: Array<subscriptionDish>;
        }

        interface changeDish {
            changeDishes: Array<{
                subscriptionDishId: number;
                dishId: number;
                orderCount: number;
            }>;
        }
    }

    export default infoTypes;
}
