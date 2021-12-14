import { EntityRepository, Repository } from "typeorm";
import { Shops } from "@entities/shops";

interface shopData {
    businessName: string;
    businessNumber: string;
    businessPhone: string;
    password: string;
    dayOff: number;
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

@EntityRepository(Shops)
export class ShopRepo extends Repository<Shops> {
    findAllShop = () => {
        return this.createQueryBuilder("shops").leftJoinAndSelect("shops.dishes", "dishes").getMany();
    };

    findAroundShop = (lat: number, lon: number, radius: number) => {
        return this.createQueryBuilder("shops")
            .select()
            .addSelect(
                `(FLOOR(1000 * 6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${lon})) + sin(radians(${lat})) * sin(radians(latitude)))))`,
                "distance"
            )
            .leftJoinAndSelect("shops.dishes", "dishes")
            .having(`distance <= ${radius}`)
            .orderBy("distance", "ASC")
            .getMany();
    };

    findOneShop = (shopId: number) => {
        return this.createQueryBuilder("shops")
            .leftJoinAndSelect("shops.dishes", "dishes")
            .where("shops.shopId = :shopd", { shopId: shopId })
            .getOne();
    };

    createShop = (data: shopData) => {
        this.createQueryBuilder().insert().into(Shops).values(data).execute();
    };

    updateShop = (shopId: number, data: shopData) => {
        this.createQueryBuilder("shops").update(Shops).set(data).where("shops.shopId = :shopId", { shopId: shopId }).execute();
    };

    // 나중에 논리적 삭제로 수정(?)
    deleteShop = (shopId: number) => {
        this.createQueryBuilder("shops").delete().from(Shops).where("shops.shopId = :shopId", { shopId: shopId }).execute();
    };
}
