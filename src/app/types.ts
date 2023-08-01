// Keep most core types in this module to try and avoid circular imports

export type GameState = {
    turnNumber: number;
    town: Town;
    cash: number;
    bank: number;
    hold: Hold;
    rngTables: RngTable[];
    // UI
    modal: ActiveModal;
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
}
