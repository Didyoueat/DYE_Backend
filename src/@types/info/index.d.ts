declare module "infoTypes" {
    export namespace infoTypes {
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
            imageUrl: string | null;
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
            imageUrl: string;
        }

        interface subscriptionDish {
            dishId: number;
            orderCount: number;
        }

        interface subscription {
            userId: number;
            shopId: number;
            weekLabel: number;
            reciever: string;
            address: string;
            deliveryCost: number;
            toShop: string | null;
            toDelivery: string | null;
            dishes: Array<subscriptionDish>;
            deleted: boolean;
        }

        interface changeDish {
            changeDishes: Array<{
                subscriptionDishId: number;
                dishId: number;
                orderCount: number;
            }>;
        }
    }
}
