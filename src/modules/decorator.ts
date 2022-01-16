import { SelectQueryBuilder } from "typeorm";
import "reflect-metadata";

declare module "typeorm" {
    interface SelectQueryBuilder<Entity> {
        getAroundShop(this: SelectQueryBuilder<Entity>): Promise<Entity[] | undefined>;
    }
}

const COLUMN_KEY = Symbol("COLUMN_KEY");

SelectQueryBuilder.prototype.getAroundShop = async function () {
    const { entities, raw } = await this.getRawAndEntities();
    let flag = 0;
    let idx = 0;

    const items = entities.map((entitiy) => {
        while (flag === raw[idx]["shops_shopId"]) {
            idx++;
        }

        const metaInfo = Reflect.getMetadata(COLUMN_KEY, entitiy) ?? {};
        const item = raw[idx];

        for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
            entitiy[propertyKey] = item[name];
        }

        flag = item["shops_shopId"];
        return entitiy;
    });

    return [...items];
};

export function VirtualColumn(name?: string): PropertyDecorator {
    return (target, propertyKey) => {
        const metaInfo = Reflect.getMetadata(COLUMN_KEY, target) || {};

        metaInfo[propertyKey] = name ?? propertyKey;

        Reflect.defineMetadata(COLUMN_KEY, metaInfo, target);
    };
}
