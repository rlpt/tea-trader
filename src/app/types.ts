// Keep most core types in this module to try and avoid circular imports

export type GameState = {
    turnNumber: number;
    townsVisited: Town[];
    cash: number;
    bank: number;
    hold: Hold;
    rngTables: RngTable[];
    modal: NoModal | ChangeLocationModal | BuySellModal;
};

export enum Town {
    London = "London",
    Portsmouth = "Portsmouth",
    Liverpool = "Liverpool",
    Glasgow = "Glasgow",
    Belfast = "Belfast",
}

export enum Tea {
    Assam = "Assam",
    EarlGrey = "Earl Grey",
    Darjeeling = "Darjeeling",
    LapsangSouchong = "Lapsang Souchong",
    GreenTea = "Green Tea",
    WhiteTea = "White Tea",
    Matcha = "Matcha",
    EnglishBreakfast = "English Breakfast",
    LadyGrey = "Lady Grey",
    Longjing = "Longjing",
}

export enum SpecialEvent {
    NoSpecialEvent,
    HighPrice,
    LowPrice,
}

export type TeaInfo = {
    [key: string]: {
        lowPrice: number;
        highPrice: number;
    };
};

export type Hold = {
    maxSize: number;
    items: HoldItems;
};

export type HoldItem = {
    quantity: number;
};

export type HoldItems = {
    [key: string]: HoldItem;
};

export type RngTable = {
    [key: string]: {
        teaPrice: TeaRng;
    };
};

export type TeaRng = {
    [key: string]: {
        randomNumber: number;
        specialEvent: SpecialEvent;
    };
};

export enum ActiveModal {
    NoModal,
    ChangeLocation,
    BuyOrSell,
}

type ChangeLocationModal = {
    modalType: "ChangeLocationModal";
};

type BuySellModal = {
    modalType: "BuySellModal";
    tea: string;
};

type NoModal = {
    modalType: "NoModal";
};

// PriceChange is relative to price in previous town
export enum PriceChange {
    PriceIncrease,
    PriceDecrease,
    NoChange,
}

export type TeaPrice = {
    teaName: string;
    price: number;
    quantity: number;
    priceChange: PriceChange;
    specialEvent: SpecialEvent;
};
