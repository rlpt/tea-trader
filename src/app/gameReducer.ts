import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import {
    ALL_TEA_NAMES,
    ALL_TOWN_NAMES,
    MAX_TURNS,
    SPECIAL_EVENT_MULTIPLIER,
    initialState,
    teaInfo,
} from "./initialState";
import { cargoTotalSelector } from "./selectors";
import {
    Cargo,
    PriceChange,
    RngTable,
    SpecialEvent,
    TeaPrice,
    TeaRng,
    Town,
} from "./types";
import { randomInRange } from "./rng";
import _ from "lodash";

export const buyTea = createAction<{
    teaName: string;
    price: number;
    quantity: number;
}>("buyTea");

export const sellTea = createAction<{
    teaName: string;
    price: number;
    quantity: number;
}>("sellTea");

export const showChangeLocationModal = createAction("showChangeLocationModal");

export const showBuySellModal = createAction<{ tea: string }>(
    "showBuySellModal",
);

export const showEndGameModal = createAction("showEndGameModal");

export const closeModal = createAction("closeModal");

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const animateNextTurn = createAsyncThunk(
    "animateNextTurn",
    async (args: { nextTown: Town }, state) => {
        await timeout(1000);

        return { nextTown: args.nextTown, message: "wot" };
    },
);

export const gameReducer = (seed: string) =>
    createReducer(initialState(seed), (builder) => {
        builder
            .addCase(animateNextTurn.pending, (state) => {
                state.wipe.content.displayTurn = state.turnNumber + 1;
                state.modal = { modalType: "NoModal" };
                state.wipe.showing = true;
            })
            .addCase(animateNextTurn.fulfilled, (state, action) => {
                // next turn
                const nextTurnNumber = state.turnNumber + 1;

                if (nextTurnNumber === MAX_TURNS) {
                    // TODO, show end game modal
                    return state;
                }

                const message = getMessage(
                    nextTurnNumber + 1,
                    action.payload.nextTown,
                    state.rngTables,
                );

                state.turnNumber = nextTurnNumber;
                state.townsVisited.push(action.payload.nextTown);
                state.modal = { modalType: "NoModal" };

                if (message !== "") {
                    state.modal = {
                        modalType: "MessageModal",
                        message,
                    };
                }

                state.wipe.showing = false;

                return state;
            })
            .addCase(closeModal, (state) => {
                state.modal = { modalType: "NoModal" };

                return state;
            })
            .addCase(showChangeLocationModal, (state) => {
                state.modal = { modalType: "ChangeLocationModal" };

                return state;
            })
            .addCase(showBuySellModal, (state, action) => {
                state.modal = {
                    modalType: "BuySellModal",
                    tea: action.payload.tea,
                };

                return state;
            })
            .addCase(showEndGameModal, (state) => {
                state.modal = { modalType: "EndGameModal" };

                return state;
            })
            .addCase(buyTea, (state, action) => {
                const { teaName, price, quantity } = action.payload;

                const holdTotal = cargoTotalSelector(state);

                const totalPrice = price * quantity;

                if (totalPrice > state.cash) {
                    return state;
                }

                if (holdTotal.current + quantity > holdTotal.max) {
                    return state;
                }

                const newTeaQuantity = state.cargo.items[teaName] + quantity;

                state.cargo.items[teaName] = newTeaQuantity;

                state.cash = state.cash - totalPrice;

                return state;
            })
            .addCase(sellTea, (state, action) => {
                const { teaName, price, quantity } = action.payload;

                const teaInHold = state.cargo.items[teaName];

                if (quantity > teaInHold) {
                    return state;
                }

                state.cash = state.cash + quantity * price;

                state.cargo.items[teaName] = teaInHold - quantity;

                return state;
            });
    });

function getMessage(
    turnNumber: number,
    currentTown: Town,
    rngTables: RngTable[],
) {
    if (turnNumber === MAX_TURNS) {
        return "";
    }

    // see if any towns next turn have a special event
    const rngTable = rngTables[turnNumber];

    // don't include current town
    const townsToCheck = ALL_TOWN_NAMES.filter(
        (townName) => townName !== currentTown,
    );

    // we pad out message list with a blank message to decrease the chance
    // of getting a message every turn
    let messages = [""];

    for (let townName of townsToCheck) {
        const teas = rngTable.towns[townName].teaPrice;

        for (let teaName of ALL_TEA_NAMES) {
            const tea = teas[teaName];

            if (tea.specialEvent === SpecialEvent.HighPrice) {
                messages.push(`Shortage of ${teaName} in ${townName}!`);
            }

            if (tea.specialEvent === SpecialEvent.LowPrice) {
                messages.push(`Glut of ${teaName} in ${townName}!`);
            }
        }
    }

    // pick random message from list
    const messageIdx = randomInRange(0, messages.length - 1, rngTable.message);

    return messages[messageIdx];
}

const getTeaPrice = (teaName: string, rngTable: TeaRng) => {
    const { lowPrice, highPrice } = teaInfo[teaName];
    const { randomNumber, specialEvent } = rngTable[teaName];

    let price = randomInRange(lowPrice, highPrice, randomNumber);

    if (specialEvent === SpecialEvent.HighPrice) {
        price = price * SPECIAL_EVENT_MULTIPLIER;
    }

    if (specialEvent === SpecialEvent.LowPrice) {
        price = Math.ceil(price / SPECIAL_EVENT_MULTIPLIER);
    }

    return { price, specialEvent };
};

export function getTeaForTurn(
    town: Town,
    prevTown: Town,
    turnNumber: number,
    hold: Cargo,
    rngTables: RngTable[],
) {
    const currentRngTable = rngTables[turnNumber].towns[town];

    const prevTurnNumber = turnNumber === 1 ? 1 : turnNumber - 1;

    // we use previous rngTable to see if prices have increase or decreased compared
    // to previous town
    const prevRngTable = rngTables[prevTurnNumber].towns[prevTown];

    const status: { [key: string]: TeaPrice } = _.fromPairs(
        ALL_TEA_NAMES.map((teaName) => {
            const { price, specialEvent } = getTeaPrice(
                teaName,
                currentRngTable.teaPrice,
            );

            const prevPrices = getTeaPrice(teaName, prevRngTable.teaPrice);

            let priceChange = PriceChange.NoChange;

            if (price > prevPrices.price) {
                priceChange = PriceChange.PriceIncrease;
            } else if (price < prevPrices.price) {
                priceChange = PriceChange.PriceDecrease;
            }

            const quantity = hold.items[teaName];

            return [
                teaName,
                {
                    teaName,
                    price,
                    quantity,
                    specialEvent,
                    priceChange,
                },
            ];
        }),
    );

    return status;
}

function events() {
    // create list of events up front
    // on each turn -> filter out invalid -> grab random event, if any

    return;
}
