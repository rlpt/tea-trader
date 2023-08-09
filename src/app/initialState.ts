import fromPairs from "lodash/fromPairs";

import * as rng from "./rng";
import { FightOutcome, GameState, Tea, TeaInfo, Town } from "./types";

export const MAX_TURNS = 30;
export const STARTING_CASH = 2000;
export const STARTING_HOLD_SIZE = 100;
export const STARTING_HEALTH = 100;
export const STARTING_STRENGTH = 30;
export const STARTING_DEFENSE = 3;
export const RUN_CHANCE = 3;
export const DAMAGE_VARIABLE = 20;

export const SPECIAL_TEA_PRICE_CHANCE = 100;
export const SPECIAL_TEA_PRICE_MULTIPLIER = 2;

export const ALL_TEA_NAMES = Object.values(Tea);
export const ALL_TOWN_NAMES = Object.values(Town);

export const smallPirate = {
    name: "small pirate",
    maxHealth: 20,
    health: 20,
    strength: 20,
    defense: 5,
    minReward: 2000,
    maxReward: 5000,
    level: 1,
};

export const initialState = (seed: string): GameState => {
    return {
        turnNumber: 1,
        townsVisited: [Town.London],
        cash: STARTING_CASH,
        cargo: {
            maxSize: STARTING_HOLD_SIZE,
            items: fromPairs(ALL_TEA_NAMES.map((teaName) => [teaName, 0])),
        },
        health: STARTING_HEALTH,
        strength: STARTING_STRENGTH,
        defense: STARTING_DEFENSE,
        rngTables: rng.getRngTables(seed),
        event: { eventType: "NoEvent" },
        modal: { modalType: "NoModal" },
        wipe: {
            showing: false,
            content: {
                contentType: "NextTurn",
                displayTurn: 1,
            },
        },
    };
};

export const teaInfo: Readonly<TeaInfo> = {
    [Tea.EarlGrey]: {
        lowPrice: 600,
        highPrice: 1400,
    },
    [Tea.Assam]: {
        lowPrice: 100,
        highPrice: 700,
    },
    [Tea.Darjeeling]: {
        lowPrice: 5000,
        highPrice: 14000,
    },
    [Tea.LapsangSouchong]: {
        lowPrice: 1500,
        highPrice: 4500,
    },
    [Tea.GreenTea]: {
        lowPrice: 70,
        highPrice: 250,
    },
    [Tea.WhiteTea]: {
        lowPrice: 300,
        highPrice: 900,
    },
    [Tea.Matcha]: {
        lowPrice: 1000,
        highPrice: 4500,
    },
    [Tea.EnglishBreakfast]: {
        lowPrice: 10,
        highPrice: 60,
    },
    [Tea.LadyGrey]: {
        lowPrice: 500,
        highPrice: 1300,
    },
    [Tea.Longjing]: {
        lowPrice: 15000,
        highPrice: 30000,
    },
};
