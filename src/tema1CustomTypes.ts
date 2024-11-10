import { Address } from "@multiversx/sdk-core";

export type CardProperties = {
    class: Class;
    rarity: Rarity;
    power: Power;
};

export type EsdtTokenData = {
    token_type: EsdtTokenType;
    amount: bigint;
    frozen: boolean;
    hash: Uint8Array;
    name: Uint8Array;
    attributes: Uint8Array;
    creator: Address;
    royalties: bigint;
    uris: Uint8Array[];
};

export enum Class {
    Warrior = 0,
    Mage = 1,
    Rogue = 2,
    Priest = 3,
    Hunter = 4,
    Warlock = 5,
    Shaman = 6,
    Druid = 7,
    Paladin = 8,
}

export enum Rarity {
    Common = 0,
    Rare = 1,
    Epic = 2,
    Legendary = 3,
}

export enum Power {
    Low = 0,
    Medium = 1,
    High = 2,
}

export enum EsdtTokenType {
    Fungible = 0,
    NonFungible = 1,
    SemiFungible = 2,
    Meta = 3,
    Invalid = 4,
}
