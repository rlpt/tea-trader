import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import {
    ALL_TEA_NAMES,
    ALL_TOWN_NAMES,
    MAX_TURNS,
    initialState,
} from "./initialState";
import { cargoTotalSelector, messageSelector } from "./selectors";
import { GameState, RngTable, SpecialEvent, Town } from "./types";
import { randomInRange } from "./rng";
import { RootState } from "./store";

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
                    state.turnNumber,
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
    const rngTable = rngTables[turnNumber + 1];

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
