import { createConnection, getCustomRepository } from "typeorm";
import infoTypes from "infoTypes";
import { UserRepo } from "@repository/user.repository";
import { ShopRepo } from "@repository/shop.repository";
import { DishRepo } from "@repository/dish.repository";
import { SubsRepo } from "@repository/subscription.repository";
import { SubsDishRepo } from "@repository/subscription.dish.repository";
import { OrderRepo } from "@repository/order.repository";

beforeAll(async () => {
    await createConnection()
        .then(() => console.log("🚀 DB Connected"))
        .catch((err) => console.log(err));
});

interface repoType {
    user: UserRepo;
    shop: ShopRepo;
    dish: DishRepo;
    subs: SubsRepo;
    subsDish: SubsDishRepo;
    order: OrderRepo;
}

interface idType {
    user: number;
    shop: number;
    dish: { one: number; two: number; three: number };
    subs: number;
    subsDish: { one: number; two: number; three: number };
    subsOnetime: number;
    order: number;
}

const repo: repoType = {
    user: undefined,
    shop: undefined,
    dish: undefined,
    subs: undefined,
    subsDish: undefined,
    order: undefined,
};

const origin: {
    user: infoTypes.user;
    shop: infoTypes.shop;
    dish: { one: infoTypes.dish; two: infoTypes.dish; three: infoTypes.dish };
    subs: infoTypes.subscription;
    subsDish: { one: infoTypes.subscriptionDish; two: infoTypes.subscriptionDish; three: infoTypes.subscriptionDish };
    order: any;
} = {
    user: undefined,
    shop: undefined,
    dish: { one: undefined, two: undefined, three: undefined },
    subs: undefined,
    subsDish: { one: undefined, two: undefined, three: undefined },
    order: undefined,
};

const id: idType = {
    user: undefined,
    shop: undefined,
    dish: { one: undefined, two: undefined, three: undefined },
    subs: undefined,
    subsDish: { one: undefined, two: undefined, three: undefined },
    subsOnetime: undefined,
    order: undefined,
};

const index = {
    shop: undefined,
    dish: undefined,
    subs: undefined,
    delShop: undefined,
    delDish: undefined,
};

const userData = (flag: string): infoTypes.user => {
    return {
        staff: false,
        loginStatus: "카카오톡",
        email: flag === "create" ? "생성" : "업데이트",
        name: "김성수",
        age: 26,
        gender: "남자",
        phone: "010-1234-1234",
        address: "서울시 어딘가~",
    };
};

const shopData = (flag: string): infoTypes.shop => {
    return {
        businessName: flag === "create" ? "생성" : "업데이트",
        businessNumber: "123123",
        businessPhone: "123123",
        password: "test",
        dayOff: 9,
        address: "테스트 주소",
        latitude: 37,
        longitude: 127,
        name: "테스트",
        phone: "123213",
        origin: "테스트 origin",
        content: "테스트 데이터 입니다.",
        officeHour: "09:00-18:00",
        imageUrl: null,
        temporaryDayStart: null,
        temporaryDayEnd: null,
    };
};

const dishData = (flag: string, shopId: number): infoTypes.dish => {
    return {
        shopId: shopId,
        main: true,
        thumbnail: true,
        title: flag === "create" ? "생성" : "업데이트",
        content: "반찬 테스트 내용",
        price: 3000,
        count: 3000,
        weight: 150,
        imageUrl: null,
    };
};

const subsData = (flag: string, shopId: number): infoTypes.subscription => {
    return {
        userId: id.user,
        shopId: shopId,
        weekLabel: 3,
        receiver: flag === "create" ? "생성" : "업데이트",
        address: "테스트 주소",
        deliveryCost: 3000,
        toShop: "가게 안녕",
        toDelivery: "기사 안녕",
    };
};

beforeAll(async () => {
    repo.user = getCustomRepository(UserRepo);
    repo.shop = getCustomRepository(ShopRepo);
    repo.dish = getCustomRepository(DishRepo);
    repo.subs = getCustomRepository(SubsRepo);
    repo.subsDish = getCustomRepository(SubsDishRepo);
    repo.order = getCustomRepository(OrderRepo);
});

/**
 * 테스트 단위
 */

describe("Database", () => {
    /**
     * 유저 테스트
     */

    describe("User", () => {
        describe("유저 등록", () => {
            test("유저 등록 성공 여부 확인", async () => {
                id.user = await (await repo.user.createUser(userData("create"))).raw.insertId;
                origin.user = await repo.user.findUser(id.user);

                expect(isNaN(id.user)).toEqual(false);
                expect(id.user !== 1).toEqual(true);
                expect(origin.user.email).toEqual("생성");
            });
        });

        describe("유저 조회", () => {
            test("유저 전체 조회", async () => {
                const allUser = await repo.user.findAllUser();

                expect(allUser.length > 0).toEqual(true);
            });

            test("유저 조회", async () => {
                const user = await repo.user.findUser(id.user);

                expect(user !== undefined).toEqual(true);
            });
        });
    });

    /**
     * 가게 & 반찬 테스트
     */

    describe("Shop & Dish", () => {
        describe("가게 & 반찬 등록", () => {
            test("가게 등록 성공 여부 확인", async () => {
                id.shop = await (await repo.shop.createShop(shopData("create"))).raw.insertId;
                origin.shop = await repo.shop.findShop(id.shop);

                expect(isNaN(id.shop)).toEqual(false);
                expect(origin.shop.businessName).toEqual("생성");
            });

            test("반찬 등록 성공 여부 확인", async () => {
                id.dish.one = await (await repo.dish.createDish(id.shop, dishData("create", id.shop))).raw.insertId;
                id.dish.two = await (await repo.dish.createDish(id.shop, dishData("create", id.shop))).raw.insertId;
                id.dish.three = await (await repo.dish.createDish(id.shop, dishData("create", id.shop))).raw.insertId;
                origin.dish.one = await repo.dish.findDish(id.shop, id.dish.one);
                origin.dish.two = await repo.dish.findDish(id.shop, id.dish.two);
                origin.dish.three = await repo.dish.findDish(id.shop, id.dish.three);

                expect(isNaN(id.dish.one)).toEqual(false);
                expect(isNaN(id.dish.two)).toEqual(false);
                expect(isNaN(id.dish.three)).toEqual(false);
                expect(origin.dish.one.title).toEqual("생성");
                expect(origin.dish.two.title).toEqual("생성");
                expect(origin.dish.three.title).toEqual("생성");
            });
        });

        describe("가게 & 반찬 조회", () => {
            describe("가게 조회", () => {
                test("가게 전체 조회", async () => {
                    const allShop = await repo.shop.findAllShops();
                    index.shop = allShop ? allShop.length : 0;

                    expect(index.shop > 0).toEqual(true);
                });

                test("주변 가게 조회", async () => {
                    const oneShop =
                        (await repo.shop.findShop(Math.floor(Math.random() * index.shop) + 1)) ??
                        (await repo.shop.findShop(Math.floor(Math.random() * index.shop) + 1));
                    const lat1 = oneShop.latitude;
                    const lon1 = oneShop.longitude;
                    const aroundShop = await repo.shop.findAroundShops(lat1, lon1, 2);

                    if (aroundShop && aroundShop.length > 0) {
                        aroundShop.map((value) => {
                            const radians = (degrees: number) => (degrees * 3.141593) / 180;
                            const lat2 = value.latitude;
                            const lon2 = value.longitude;
                            const distance =
                                6371 *
                                Math.acos(
                                    Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.cos(radians(lon2) - radians(lon1)) +
                                        Math.sin(radians(lat1)) * Math.sin(radians(lat2))
                                );
                            expect(value.distance !== undefined).toEqual(true);
                            expect(Math.floor(value.distance * 1000)).toEqual(Math.floor(distance * 1000));
                        });
                    }
                });

                test("한 가게 조회", async () => {
                    const shopId = Math.floor(Math.random() * index.shop) + 1;
                    const oneShop = await repo.shop.findShop(shopId);

                    expect(oneShop !== undefined).toEqual(true);
                });

                test("삭제된 모든 반찬가게 조회", async () => {
                    const delAllShop = await repo.shop.findSoftDeletedAllShops();
                    index.delShop = delAllShop ? delAllShop.length : 0;

                    if (index.delShop > 0) {
                        expect(index.delShop > 0).toEqual(true);
                    } else {
                        expect(index.delShop > 0).toEqual(false);
                    }
                });

                test("삭제된 한 반찬가게 조회", async () => {
                    const shopId = Math.floor(Math.random() * index.delShop) + 1;
                    const delOneShop = await repo.shop.findSoftDeletedShop(shopId);

                    expect(delOneShop !== undefined).toEqual(true);
                });
            });

            describe("반찬 조회", () => {
                test("가게의 모든 반찬 조회", async () => {
                    const allDish = await repo.dish.findShopAllDishes(id.shop);

                    expect(allDish !== undefined).toEqual(true);
                    expect(allDish.length > 0).toEqual(true);
                    expect(allDish.length === 3).toEqual(true);
                });

                test("가게 반찬 조회", async () => {
                    const dish1 = await repo.dish.findDish(id.shop, id.dish.one);
                    const dish2 = await repo.dish.findDish(id.shop, id.dish.two);
                    const dish3 = await repo.dish.findDish(id.shop, id.dish.three);

                    expect(dish1 !== undefined).toEqual(true);
                    expect(dish2 !== undefined).toEqual(true);
                    expect(dish3 !== undefined).toEqual(true);
                });
            });
        });

        describe("가게 & 반찬 수정", () => {
            test("반찬 수정 결과 & 정상적으로 수정 되었는지 확인", async () => {
                const updateDish = await repo.dish.updateDish(id.shop, id.dish.one, dishData("update", id.shop));
                const find = await repo.dish.findDish(id.shop, id.dish.one);

                expect(updateDish.affected).toEqual(1);
                expect(find.title).toEqual("업데이트");
            });

            test("가게 수정 결과 & 정상적으로 수정 되었는지 확인", async () => {
                const updateShop = await repo.shop.updateShop(id.shop, shopData("update"));
                const find = await repo.shop.findShop(id.shop);

                expect(updateShop.affected).toEqual(1);
                expect(find.businessName).toEqual("업데이트");
            });
        });
    });

    /**
     * 구독 & 구독 반찬 테스트
     */

    describe("Subscription & Subscription Dish", () => {
        describe("구독 & 구독 반찬 등록", () => {
            test("구독 등록 성공 여부 확인", async () => {
                id.subs = await (await repo.subs.createSubs(id.user, subsData("create", id.shop))).raw.insertId;
                origin.subs = await repo.subs.findSubs(id.user, id.subs);

                expect(isNaN(id.subs)).toEqual(false);
                expect(origin.subs.receiver).toEqual("생성");
            });

            test("구독 반찬 등록 성공 여부 확인", async () => {
                id.subsDish.one = await (
                    await repo.subsDish.createSubsDish(id.subs, id.dish.one, origin.dish.one, 1)
                ).raw.insertId;
                id.subsDish.two = await (
                    await repo.subsDish.createSubsDish(id.subs, id.dish.two, origin.dish.two, 1)
                ).raw.insertId;
                id.subsDish.three = await (
                    await repo.subsDish.createSubsDish(id.subs, id.dish.three, origin.dish.three, 1)
                ).raw.insertId;
                origin.subsDish.one = await repo.subsDish.findSubsDish(id.subsDish.one);
                origin.subsDish.two = await repo.subsDish.findSubsDish(id.subsDish.two);
                origin.subsDish.three = await repo.subsDish.findSubsDish(id.subsDish.three);

                expect(isNaN(id.subsDish.one)).toEqual(false);
                expect(isNaN(id.subsDish.two)).toEqual(false);
                expect(isNaN(id.subsDish.three)).toEqual(false);
                expect(origin.subsDish.one.title).toEqual("생성");
                expect(origin.subsDish.two.title).toEqual("생성");
                expect(origin.subsDish.three.title).toEqual("생성");
            });
        });

        describe("구독 & 구독 반찬 조회", () => {
            describe("구독 조회", () => {
                test("모든 유저 구독 조회", async () => {
                    const allSubs = await repo.subs.findAllSubs();
                    index.subs = allSubs.length;

                    expect(allSubs.length > 0).toEqual(true);
                });

                test("가게 구독 조회", async () => {
                    const shopSubs = await repo.subs.findShopSubs(id.shop);

                    expect(shopSubs.length > 0).toEqual(true);
                    expect(shopSubs[0].shopId).toEqual(id.shop);
                });

                test("유저 구독 조회", async () => {
                    const userSubs = await repo.subs.findUserSubs(id.user);

                    expect(userSubs.length > 0).toEqual(true);
                    userSubs.map((value) => {
                        expect(value.userId).toEqual(id.user);
                    });
                });

                test("구독 조회", async () => {
                    const subs = await repo.subs.findSubs(id.user, id.subs);

                    expect(subs.receiver).toEqual("생성");
                    expect(subs.subscriptionId).toEqual(id.subs);
                    expect(subs.userId).toEqual(id.user);
                    expect(subs.shopId).toEqual(id.shop);
                });
            });

            describe("구독 반찬 조회", () => {
                test("구독한 모든 반찬 조회", async () => {
                    const subsDishes = await repo.subsDish.findSubsDishes(id.subs);

                    expect(subsDishes.length > 0).toEqual(true);
                    expect(subsDishes[0].subscriptionDishId).toEqual(id.subsDish.one);
                    expect(subsDishes[1].subscriptionDishId).toEqual(id.subsDish.two);
                    expect(subsDishes[2].subscriptionDishId).toEqual(id.subsDish.three);
                });

                test("구독한 반찬 조회", async () => {
                    const subsDish = await repo.subsDish.findSubsDish(id.subsDish.one);

                    expect(subsDish !== undefined).toEqual(true);
                    expect(subsDish.subscriptionDishId).toEqual(id.subsDish.one);
                });
            });
        });

        describe("구독 & 구독 반찬 수정", () => {
            test("구독 정보 수정", async () => {
                const updateSubs = await repo.subs.updateSubsInfo(id.user, id.subs, subsData("update", id.shop));
                const updatedSubsCheck = await repo.subs.findSubs(id.user, id.subs);

                expect(updateSubs.affected).toEqual(1);
                expect(updatedSubsCheck.receiver).toEqual("업데이트");
            });

            test("구독 반찬 이번만 수정", async () => {
                const onetimeSubsDish1 = await repo.subsDish.updateSubsOnetime(
                    id.subs,
                    id.subsDish.one,
                    id.dish.one,
                    origin.dish.one,
                    5
                );
                id.subsOnetime = onetimeSubsDish1.raw.insertId;
                const onetimeSubsDishCheck1 = await repo.subsDish.findOnetimeSubsDish(id.subsDish.one);
                const onetimeSubsDish2 = await repo.subsDish.updateSubsOnetime(
                    id.subs,
                    id.subsDish.one,
                    id.dish.two,
                    origin.dish.two,
                    5
                );
                id.subsOnetime = onetimeSubsDish2.raw.insertId;
                const onetimeSubsDishCheck2 = await repo.subsDish.findOnetimeSubsDish(id.subsDish.one);

                expect(onetimeSubsDish1.raw.insertId).toEqual(onetimeSubsDishCheck1.subscriptionOnetime[0].subscriptionOnetimeId);
                expect(onetimeSubsDish2.raw.insertId).toEqual(onetimeSubsDishCheck2.subscriptionOnetime[0].subscriptionOnetimeId);
                expect(
                    onetimeSubsDishCheck1.subscriptionOnetime[0].subscriptionOnetimeId !==
                        onetimeSubsDishCheck2.subscriptionOnetime[0].subscriptionOnetimeId
                ).toEqual(true);
            });

            test("구독 반찬 이번만 변경 취소", async () => {
                const cancleOnetime = await repo.subsDish.updateCancleOnetime(id.subsDish.one);
                const cancledOnetimeCheck = await repo.subsDish.findOnetimeSubsDish(id.subsDish.one);

                expect(cancleOnetime.affected).toEqual(1);
                expect(cancledOnetimeCheck.oneTime).toEqual(false);
                expect(cancledOnetimeCheck.subscriptionOnetime.length).toEqual(0);
            });

            test("구독 반찬 변경", async () => {
                const changedSubsDishCheck1 = await repo.subsDish.findSubsDish(id.subsDish.two);
                const changeSubsDish = await repo.subsDish.updateSubsDish(
                    id.subs,
                    id.subsDish.two,
                    id.dish.three,
                    origin.dish.three,
                    30
                );
                const changedSubsDishCheck2 = await repo.subsDish.findSubsDish(changeSubsDish.raw.insertId);
                expect(changedSubsDishCheck1.dishId !== changedSubsDishCheck2.dishId).toEqual(true);
            });
        });
    });

    /**
     * 테스트 데이터 삭제
     */

    describe("Delete data", () => {
        describe("구독 & 구독 반찬 삭제", () => {
            test("구독 반찬 논리적 & 물리적 삭제 결과 확인", async () => {
                const softDeletedSubsDish = await repo.subsDish.softDeleteSubsDish(id.subsDish.one);
                const softDeletedSubsDishCheck = await repo.subsDish.findSoftDeletedSubsDish(id.subsDish.one);
                const deleteSubsDish = await repo.subsDish.deleteSubsDish(id.subsDish.one);
                const deletedSubsDishCheck = await repo.subsDish.findSubsDish(id.subsDish.one);

                expect(softDeletedSubsDish.affected).toEqual(1);
                expect(softDeletedSubsDishCheck.deletedAt === null).toEqual(false);
                expect(deleteSubsDish.affected).toEqual(1);
                expect(deletedSubsDishCheck).toEqual(undefined);
            });

            test("구독 논리적 & 물리적 삭제 결과 확인", async () => {
                const softDeleteSubs = await repo.subs.softDeleteSubs(id.subs);
                const softDeleteSubsDish = await repo.subsDish.softDeleteSubsDishes(id.subs);
                const softDeletedSubsCheck = await repo.subs.findSoftDeletedSubs(id.subs);
                const softDeletedSubsDishCheck = await repo.subsDish.findSoftDeletedSubsDishes(id.subs);
                const deleteSubs = await repo.subs.deleteSubs(id.subs);
                const deletedSubsCheck = await repo.subs.findSubs(id.user, id.subs);
                const deletedSubsDishCheck = await repo.subsDish.findSubsDishes(id.subs);

                expect(softDeleteSubs.affected).toEqual(1);
                expect(softDeletedSubsCheck.deletedAt === null).toEqual(false);
                expect(softDeleteSubsDish.affected).toEqual(softDeletedSubsDishCheck.length);
                expect(deleteSubs.affected).toEqual(1);
                expect(deletedSubsCheck).toEqual(undefined);
                deletedSubsDishCheck.map((value) => {
                    expect(value).toEqual(undefined);
                });
            });
        });

        describe("가게 & 반찬 삭제", () => {
            test("반찬 논리적 & 물리적 삭제 결과 확인", async () => {
                const softDeletedDish = await repo.dish.softDeleteDish(id.shop, id.dish.one);
                const softDeletedDishCheck = await repo.dish.findSoftDeletedDish(id.shop, id.dish.one);
                const deleteDish = await repo.dish.deleteDish(id.shop, id.dish.one);
                const deletedCheck = await repo.dish.findDish(id.shop, id.dish.one);

                expect(softDeletedDish.affected).toEqual(1);
                expect(softDeletedDishCheck.deletedAt === null).toEqual(false);
                expect(deleteDish.affected).toEqual(1);
                expect(deletedCheck).toEqual(undefined);
            });

            test("가게 논리적 & 물리적 삭제 결과 확인", async () => {
                const softDeleteShop = await repo.shop.softDeleteShop(id.shop);
                const softDeleteDish = await repo.dish.softDeleteShopDishes(id.shop);
                const softDeletedShopCheck = await repo.shop.findSoftDeletedShop(id.shop);
                const softDeletedDishCheck = await repo.dish.findSoftDeletedShopDishes(id.shop);
                const deleteShop = await repo.shop.deleteShop(id.shop);
                const deletedShopCheck = await repo.shop.findShop(id.shop);
                const deletedDishCheck = await repo.dish.findShopAllDishes(id.shop);

                expect(softDeleteShop.affected).toEqual(1);
                expect(softDeletedShopCheck.deletedAt === null).toEqual(false);
                expect(softDeleteDish.affected).toEqual(softDeletedDishCheck.length);
                expect(deleteShop.affected).toEqual(1);
                expect(deletedShopCheck).toEqual(undefined);
                deletedDishCheck.map((value) => {
                    expect(value).toEqual(undefined);
                });
            });
        });

        describe("유저 삭제", () => {
            test("유저 논리적 & 물리적 삭제", async () => {
                const softDeleteUser = await repo.user.softDeleteUser(id.user);
                const softDeletedUserCheck = await repo.user.findDeletedUser(id.user);
                const deleteUser = await repo.user.deleteUser(id.user);
                const deletedUserCheck = await repo.user.findUser(id.user);

                expect(softDeleteUser.affected).toEqual(1);
                expect(softDeletedUserCheck.deletedAt === null).toEqual(false);
                expect(deleteUser.affected).toEqual(1);
                expect(deletedUserCheck).toEqual(undefined);
            });
        });
    });
});
