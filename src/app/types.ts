// Keep most core types in this module to try and avoid circular imports

export type GameState = {
    gameOver: boolean;
    turnNumber: number;
    townsVisited: Town[];
    cash: number;
    cargo: Cargo;
    health: number;
    strength: number;
    defense: number;
    event: SpecialEvent;
    modal: NoModal | ChangeLocationModal | BuySellModal | EndGameModal;
    wipe: {
        showing: boolean;
        content: NoWipe | WipeNextTurn | WipeGameOver | WipeFinalTurn;
    };
    rngTables: RngTable[];
    scoreboard: ScoreBoardItem[];
};

export type ScoreBoardItem = { score: number; latest: boolean };

export type SpecialEvent =
    | NoEvent
    | FightEvent
    | ArmorEvent
    | CargoEvent
    | HealEvent
    | WeaponEvent;

type FightEvent = {
    eventType: "FightEvent";
    opponent: Npc;
    rngIndex: number;
    outcome: FightOutcome;
    messages: { text: string; key: string }[];
};

type NoEvent = {
    eventType: "NoEvent";
};

type ArmorEvent = {
    eventType: "ArmorEvent";
};

type CargoEvent = {
    eventType: "CargoEvent";
};

type HealEvent = {
    eventType: "HealEvent";
};

type WeaponEvent = {
    eventType: "WeaponEvent";
};

export enum FightOutcome {
    PlayerWins,
    OpponentWins,
    StillStanding,
    RanAway,
}

export interface Fighter {
    health: number;
    strength: number;
    defense: number;
}

export type FightInProgress = {
    outcome: FightOutcome;
    player: Fighter;
    opponent: Fighter;
    messages: { text: string; key: string }[];
};

export type Npc = {
    name: string;
    health: number;
    strength: number;
    defense: number;
    minReward: number;
    maxReward: number;
    level: number;
};

type NoWipe = {
    contentType: "NoWipe";
};

type WipeNextTurn = {
    contentType: "WipeNextTurn";
    displayTurn: number;
};

type WipeGameOver = {
    contentType: "WipeGameOver";
};

type WipeFinalTurn = {
    contentType: "WipeFinalTurn";
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

export enum PriceEvent {
    NoPriceEvent,
    HighPrice,
    LowPrice,
}

export type TeaInfo = {
    [key: string]: {
        lowPrice: number;
        highPrice: number;
    };
};

export type Cargo = {
    maxSize: number;
    items: CargoItems;
};

export type CargoItems = {
    [tea: string]: number;
};

export type RngTable = {
    message: number;
    specialEvent: number;
    specialEventValue: number;
    fight: number[];
    towns: {
        [town: string]: {
            teaPrice: TeaRng;
        };
    };
};

export type TeaRng = {
    [tea: string]: {
        randomNumber: number;
        specialEvent: PriceEvent;
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

type EndGameModal = {
    modalType: "EndGameModal";
};

type NoModal = {
    modalType: "NoModal";
};

export enum Price {
    AboveAvg,
    BelowAvg,
    Avg,
}

export type TeaPrice = {
    teaName: string;
    price: number;
    quantity: number;
    priceAvg: Price;
    specialEvent: PriceEvent;
};
