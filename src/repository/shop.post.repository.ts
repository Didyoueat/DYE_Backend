import { EntityRepository, Repository } from "typeorm";
import infoTypes from "infoTypes";
import ShopPosts from "@entities/shop.posts";

@EntityRepository(ShopPosts)
export class ShopPostRepo extends Repository<ShopPosts> {
    findAllShopPosts = () => {
        return this.createQueryBuilder("shopPosts").select().getMany();
    };

    findShopPosts = (shopId: number) => {
        return this.createQueryBuilder("shopPosts")
            .select()
            .where("shopPosts.shopId = :shopId", { shopId: shopId })
            .getMany();
    };

    findOnePost = (shopPostId: number) => {
        return this.createQueryBuilder("shopPost")
            .select()
            .where("shopPost.shopPostId = :shopPostId", { shopPostId: shopPostId })
            .getOne();
    };

    createShopPost = async (shopId: number, data: infoTypes.shopPost) => {
        data["shopId"] = shopId;
        return await this.createQueryBuilder().insert().into(ShopPosts).values(data).execute();
    };

    updateShopPost = async (shopPostId: number, data: infoTypes.shopPost) => {
        return await this.createQueryBuilder("shopPost")
            .update(ShopPosts)
            .set(data)
            .where("shopPost.shopPostId = :shopPostId", { shopPostId: shopPostId })
            .execute();
    };

    softDeleteShopPost = async (shopPostId: number) => {
        return await this.createQueryBuilder("shopPost")
            .where("shopPost.shopPostId = :shopPostId", { shopPostId: shopPostId })
            .softDelete()
            .execute();
    };

    deleteShopPost = async (shopPostId: number) => {
        return await this.createQueryBuilder("shopPost")
            .delete()
            .where("shopPost.shopPostId = :shopPostId", { shopPostId: shopPostId })
            .execute();
    };
}
