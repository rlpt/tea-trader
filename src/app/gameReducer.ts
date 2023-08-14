import {
    createAction,
    createAsyncThunk,
    createReducer,
    createSelector,
} from "@reduxjs/toolkit";

import { totalItems } from "./cargo";
import { getRandomEvent } from "./events";
import { fight, run } from "./fight";
import { initialState, MAX_TURNS } from "./initialState";
import { getPriceMessages } from "./priceMessages";
import { getRngFromList } from "./rng";
import { RootState } from "./store";
import { getTeaForTurn } from "./teaPrice";
import {
    Cargo,
    Fighter,
    FightInProgress,
    FightOutcome,
    RngTable,
    Town,
} from "./types";

export const newGame = createAsyncThunk("newGame", async (args: string) => {
    await timeout(1000);

    return args;
});

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

export const showFinalScore = createAction("showFinalScore");

export const showBuySellModal = createAction<{ tea: string }>(
    "showBuySellModal",
);

export const showEndGameModal = createAction("showEndGameModal");

export const closeModal = createAction("closeModal");

export const endSpecialEvent = createAction("endSpecialEvent");

export const buyArmor = createAction<{
    cost: number;
    value: number;
}>("buyArmor");

export const buyCargoSpace = createAction<{
    cost: number;
    value: number;
}>("buyCargoSpace");

export const heal = createAction<{
    value: number;
}>("heal");

export enum FightInput {
    FightClicked,
    RunClicked,
}

export const fightMoveClicked = createAction<FightInput>("fightMoveClicked");

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const animateNextTurn = createAsyncThunk(
    "animateNextTurn",
    async (args: { nextTown: Town }) => {
        await timeout(1000);

        return { nextTown: args.nextTown };
    },
);

export const gameReducer = (seed: string) =>
    createReducer(initialState(seed), (builder) => {
        builder
            .addCase(newGame.pending, (state, action) => {
                state.wipe.content = {
                    contentType: "WipeNextTurn",
                    displayTurn: 1,
                };

                state.wipe.showing = true;

                return state;
            })
            .addCase(newGame.fulfilled, (state, action) => {
                return {
                    ...initialState(action.payload),
                    wipe: {
                        ...state.wipe,
                        showing: false,
                    },
                };
            })
            .addCase(animateNextTurn.pending, (state) => {
                const nextTurnNumber = state.turnNumber + 1;

                if (nextTurnNumber === MAX_TURNS) {
                    state.wipe.content = {
                        contentType: "WipeGameOver",
                    };
                } else {
                    state.wipe.content = {
                        contentType: "WipeNextTurn",
                        displayTurn: state.turnNumber + 1,
                    };
                }

                state.modal = { modalType: "NoModal" };
                state.wipe.showing = true;
            })
            .addCase(animateNextTurn.fulfilled, (state, action) => {
                // next turn
                const nextTurnNumber = state.turnNumber + 1;
                state.modal = { modalType: "NoModal" };
                state.wipe.showing = false;

                state.turnNumber = nextTurnNumber;

                if (nextTurnNumber === MAX_TURNS) {
                    // game is over
                    return state;
                }

                state.townsVisited.push(action.payload.nextTown);

                const rngTable = getRngTableForTurn(
                    nextTurnNumber,
                    state.rngTables,
                );

                state.event = getRandomEvent(
                    state,
                    rngTable.specialEvent,
                    rngTable.specialEventValue,
                );

                return state;
            })
            .addCase(showFinalScore, (state) => {
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
            })
            .addCase(fightMoveClicked, (state, action) => {
                if (state.event.eventType === "FightEvent") {
                    const fightEvent = state.event;

                    const rngTable = getRngTableForTurn(
                        state.turnNumber,
                        state.rngTables,
                    );

                    const rngForFight = getRngFromList(
                        fightEvent.rngIndex,
                        4,
                        rngTable.fight,
                    );

                    const [rng1, rng2, rng3, rng4] = rngForFight.items;

                    const fightFn =
                        action.payload === FightInput.FightClicked
                            ? fight
                            : run;

                    const result = fightFn(
                        state,
                        fightEvent.opponent,
                        rng1,
                        rng2,
                        rng3,
                        rng4,
                    );

                    state.event.rngIndex = rngForFight.newIndex;
                    state.event.outcome = result.outcome;
                    state.event.messages.push(result.message);

                    state.health = result.player.health;
                    state.event.opponent.health = result.opponent.health;

                    if (result.outcome === FightOutcome.PlayerWins) {
                        state.cash += result.reward;
                    }

                    return state;
                }
            })
            .addCase(endSpecialEvent, (state) => {
                state.event = { eventType: "NoEvent" };
            })
            .addCase(buyArmor, (state, action) => {
                const { cost, value } = action.payload;

                if (cost > state.cash) {
                    return state;
                }

                state.cash -= cost;
                state.defense += value;
            })
            .addCase(buyCargoSpace, (state, action) => {
                const { cost, value } = action.payload;

                if (cost > state.cash) {
                    return state;
                }

                state.cash -= cost;
                state.cargo.maxSize += value;
            })
            .addCase(heal, (state, action) => {
                state.health += action.payload.value;
            });
    });

export function currentTown(townsVisited: Town[], turnNumber: number) {
    return townsVisited[turnNumber - 1];
}

export function getRngTableForTurn(
    turnNumber: number,
    rngTables: RngTable[],
): RngTable {
    // turns are 1-based, but list of rngTables is 0-based, so subtract 1 from current
    // turn number to get the correct rngTable
    return rngTables[turnNumber - 1];
}

export const townSelector = (state: RootState) => {
    return currentTown(state.townsVisited, state.turnNumber);
};

export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;
export const currentRngTableSelector = (state: RootState) =>
    getRngTableForTurn(state.turnNumber, state.rngTables);
export const cashSelector = (state: RootState) => state.cash;
export const cargoSelector = (state: RootState) => state.cargo;
export const wipeSelector = (state: RootState) => state.wipe;
export const specialEventSelector = (state: RootState) => state.event;

export const isLastTurnSelector = (state: RootState) => state.turnNumber + 1;

export const gameOverSelector = createSelector(
    [turnNumberSelector],
    (turnNumber) => turnNumber === MAX_TURNS,
);

export const playerSelector = (state: RootState): Fighter => {
    return {
        health: state.health,
        strength: state.strength,
        defense: state.defense,
    };
};

export const cargoTotalSelector = createSelector(
    [cargoSelector],
    (hold: Cargo) => {
        return {
            current: totalItems(hold.items),
            max: hold.maxSize,
        };
    },
);

export const teaPriceSelector = createSelector(
    [townSelector, cargoSelector, currentRngTableSelector],
    getTeaForTurn,
);

export const fightSelector = createSelector(
    [(state: RootState) => state.event, playerSelector],
    (event, player): FightInProgress | null => {
        if (event.eventType === "FightEvent") {
            return {
                outcome: event.outcome,
                player,
                opponent: event.opponent,
                messages: event.messages,
            };
        }

        return null;
    },
);

export const priceMessagesSelector = createSelector(
    [turnNumberSelector, townSelector, rngTablesSelector],
    (currentTurn, town, rngTables) =>
        // add one to current turn as we want the prices messages for the next turn
        getPriceMessages(currentTurn + 1, town, rngTables),
);
