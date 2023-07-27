import { TeaInfo, Tea, GameState } from "./types";
import * as _ from "lodash";

export const MAX_TURNS = 30;
export const STARTING_CASH = 20000;

export const ALL_TEA_KEYS = Object.keys(Tea);

export const initialState: GameState = {
    turnsLeft: MAX_TURNS,
    cash: STARTING_CASH,
    hold: {
        maxSize: 100,
        items: _.fromPairs(
            ALL_TEA_KEYS.map((teaKey) => [
                teaKey,
                {
                    quantity: 0,
                    lastBuyPrice: 0,
                },
            ]),
        ),
    },
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
