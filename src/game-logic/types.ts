// Keep most core types in this module to try and avoid circular imports

export type GameState = {
    seed: string;
    screen: GameScreen[]; // So we can show scoreboard without messing with existing game screen use a stack, stored as a list
    turnNumber: number;
    townsVisited: Town[];
    cash: number;
    debt: number;
    cargo: Cargo;
    name: string;
    health: number;
    strength: number;
    defense: number;
    event: SpecialEvent;
    modal:
        | NoModal
        | ChangeLocationModal
        | BuySellModal
        | EndGameModal
        | MenuModal
        | TeaEventModal
        | BankModal;
    wipe: {
        showing: boolean;
        content: NoWipe | TextWipe;
    };
    rngTables: RngTable[];
    scoreboard: ScoreboardItem[];
};

export type FinalScore = { name: string; score: number };

export type ScoreboardItem = { score: FinalScore; latest: boolean };

export enum GameScreen {
    Start,
    Trade,
    GameOver,
    Scoreboard,
}

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
    messages: FightMessage[];
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
    name: string;
    health: number;
    strength: number;
    defense: number;
}

export type FightInProgress = {
    outcome: FightOutcome;
    player: Fighter;
    opponent: Fighter;
    messages: FightMessage[];
};

export type FightMessage = {
    log: FightLog[];
    text: string;
    key: string;
};

export type FightLog = "PlayerHit" | "OpponentHit" | "PlayerRan";

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

type TextWipe = {
    contentType: "TextWipe";
    text: string;
};

export enum Town {
    London = "London",
    Portsmouth = "Portsmouth",
    Liverpool = "Liverpool",
    Glasgow = "Glasgow",
    Newcastle = "Newcastle",
}

export enum TownFeature {
    Bank,
}

export enum Tea {
    Assam = "Assam",
    Ceylon = "Ceylon",
    EarlGrey = "Earl Grey",
    Rooibos = "Rooibos",
    Matcha = "Matcha",
    Darjeeling = "Darjeeling",
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
    [key: string]: number;
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

type MenuModal = {
    modalType: "MenuModal";
};

type BankModal = {
    modalType: "BankModal";
};

export type TeaEventModal = {
    modalType: "TeaEventModal";
    event: { teaName: string; event: PriceEvent };
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

export enum DebugAction {
    FightSmallPirate,
    FightMediumPirate,
    FightLargePirate,
    FightExtraLargePirate,
    ArmorEvent,
    WeaponEvent,
    CargoEvent,
    HealEvent,
    ShowBank,
}
