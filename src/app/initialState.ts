import _ from "lodash";
import { TeaInfo, Tea, GameState } from "./types";
import * as rng from "./rng";

export const MAX_TURNS = 30;
export const STARTING_CASH = 20000;
export const STARTING_DEBT = 50000;
export const DEBT_INTEREST_RATE = 0.1;
export const STARTING_HOLD_SIZE = 100;

export const ALL_TEA_NAMES = Object.values(Tea);

export const initialState = (seed: string): GameState => {
    return {
        turnNumber: 1,
        cash: STARTING_CASH,
        hold: {
            maxSize: STARTING_HOLD_SIZE,
            items: _.fromPairs(
                ALL_TEA_NAMES.map((teaName) => [
                    teaName,
                    {
                        quantity: 0,
                        lastBuyPrice: 0,
                    },
                ]),
            ),
        },
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
