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

    const items = entities.map((entitiy, index) => {
        const metaInfo = Reflect.getMetadata(COLUMN_KEY, entitiy) ?? {};
        const item = raw[index];

        for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
            entitiy[propertyKey] = item[name];
        }

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
