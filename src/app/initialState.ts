import fromPairs from "lodash/fromPairs";

import * as rng from "./rng";
import { FightOutcome, GameState, Tea, TeaInfo, Town } from "./types";

export const MAX_TURNS = 29;
export const STARTING_CASH = 2000;
export const STARTING_CARGO_SIZE = 100;
export const STARTING_HEALTH = 100;
export const STARTING_STRENGTH = 30;
export const STARTING_DEFENSE = 10; //3;
export const RUN_CHANCE = 3;
export const DAMAGE_VARIABLE = 20;

export const SPECIAL_TEA_PRICE_CHANCE = 100;
export const SPECIAL_TEA_PRICE_MULTIPLIER = 2;

export const ALL_TEA_NAMES = Object.values(Tea);
export const ALL_TOWN_NAMES = Object.values(Town);

export const DEFENSE_INCREASE_COST = 25000;
export const DEFENSE_INCREASE_VALUE = 10;
export const CARGO_INCREASE_COST = 5000;
export const CARGO_INCREASE_VALUE = 50;
export const STRENGTH_INCREASE_COST = 30000;
export const STRENGTH_INCREASE_VALUE = 15;
export const HEAL_EVENT_INCREASE = 5;

export const initialState = (seed: string): GameState => {
    return {
        gameOver: false,
        turnNumber: 0,
        townsVisited: [Town.London],
        cash: STARTING_CASH,
        cargo: {
            maxSize: STARTING_CARGO_SIZE,
            items: fromPairs(ALL_TEA_NAMES.map((teaName) => [teaName, 0])),
        },
        health: STARTING_HEALTH,
        strength: STARTING_STRENGTH,
        defense: STARTING_DEFENSE,
        // event: { eventType: "NoEvent" },
        event: {
            eventType: "FightEvent",
            opponent: SMALL_PIRATE,
            rngIndex: 0,
            outcome: FightOutcome.StillStanding,
            messages: [
                { text: "You hit for 4 and took 1 damage", key: "1" },
                { text: "You hit for 4 and took 1 damage", key: "2" },
                { text: "You hit for 4 and took 1 damage", key: "3" },
                { text: "You hit for 4 and took 1 damage", key: "4" },
                { text: "You hit for 4 and took 1 damage", key: "5" },
                { text: "You hit for 4 and took 1 damage", key: "6" },
                { text: "You hit for 4 and took 1 damage", key: "7" },
                { text: "You hit for 4 and took 1 damage", key: "8" },
                { text: "You hit for 4 and took 1 damage", key: "9" },
                { text: "You hit for 4 and took 1 damage", key: "10" },
                { text: "You hit for 4 and took 1 damage", key: "11" },
                { text: "You hit for 4 and took 1 damage", key: "12" },
            ],
        },
        modal: { modalType: "NoModal" },
        wipe: {
            showing: false,
            content: {
                contentType: "NoWipe",
            },
        },
        scoreboard: [],
        rngTables: rng.getRngTables(seed),
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

export const SMALL_PIRATE = {
    name: "Small Pirate",
    maxHealth: 20,
    health: 20,
    strength: 20,
    defense: 5,
    minReward: 2000,
    maxReward: 5000,
    level: 1,
};
