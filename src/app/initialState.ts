import _ from "lodash";
import { TeaInfo, Tea, GameState, Town } from "./types";
import * as rng from "./rng";

export const MAX_TURNS = 30;
export const STARTING_CASH = 2000;
export const STARTING_HOLD_SIZE = 100;

export const SPECIAL_EVENT_CHANCE = 30;
export const SPECIAL_EVENT_MULTIPLIER = 3;

export const ALL_TEA_NAMES = Object.values(Tea);

export const ALL_TOWN_NAMES = Object.values(Town);

export const initialState = (seed: string): GameState => {
    return {
        turnNumber: 1,
        townsVisited: [Town.London],
        cash: STARTING_CASH,
        cargo: {
            maxSize: STARTING_HOLD_SIZE,
            items: _.fromPairs(ALL_TEA_NAMES.map((teaName) => [teaName, 0])),
        },
        rngTables: rng.getRngTables(seed),
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
