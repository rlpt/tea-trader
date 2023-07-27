// Keep most core types in this module to try and avoid circular imports

export type GameState = {
    turnNumber: number;
    cash: number;
    hold: Hold;
    rngTables: RngTable[];
};

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
    lastBuyPrice: number;
};

export type HoldItems = {
    [key: string]: HoldItem;
};

export type RngTable = {
    teaPrice: {
        [key: string]: number;
    };
};
