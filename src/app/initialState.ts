import { TeaInfo, Tea, GameState } from "./types";

export const MAX_TURNS = 30;

export const ALL_TEA_KEYS = Object.keys(Tea);

export const initialState: GameState = {
    turnsLeft: 30,
    balance: 1000,
    hold: {
        maxSize: 100,
        items: {
            [Tea.EarlGrey]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.Assam]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.Darjeeling]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.LapsangSouchong]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.GreenTea]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.WhiteTea]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.Matcha]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.EnglishBreakfast]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.LadyGrey]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
            [Tea.Longjing]: {
                quantity: 0,
                lastBuyPrice: 0,
            },
        },
    },
};

export const teaInfo: Readonly<TeaInfo> = {
    [Tea.EarlGrey]: {
        basePrice: 100,
    },
    [Tea.Assam]: {
        basePrice: 130,
    },
    [Tea.Darjeeling]: {
        basePrice: 120,
    },
    [Tea.LapsangSouchong]: {
        basePrice: 230,
    },
    [Tea.GreenTea]: {
        basePrice: 10,
    },
    [Tea.WhiteTea]: {
        basePrice: 70,
    },
    [Tea.Matcha]: {
        basePrice: 50,
    },
    [Tea.EnglishBreakfast]: {
        basePrice: 10,
    },
    [Tea.LadyGrey]: {
        basePrice: 20,
    },
    [Tea.Longjing]: {
        basePrice: 180,
    },
};
