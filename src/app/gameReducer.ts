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
import { loadScores, mergeScores, saveScores } from "./scoreboard";
import { RootState } from "./store";
import { getTeaForTurn } from "./teaPrice";
import {
    Cargo,
    Fighter,
    FightInProgress,
    FightOutcome,
    GameScreen,
    Town,
} from "./types";

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const nextTurn = createAsyncThunk(
    "nextTurn",
    async (args: { nextTown: Town }) => {
        await timeout(1000);

        return { nextTown: args.nextTown };
    },
);

export const newGame = createAsyncThunk("newGame", async () => {
    await timeout(1000);

    // create seed for new game
    return new Date().getTime().toString();
});

export const restart = createAsyncThunk("restart", async () => {
    await timeout(1000);

    return "";
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

export const showFinalScore = createAsyncThunk(
    "showFinalScore",
    async (args, { getState }) => {
        const state = getState() as RootState;

        const scores = loadScores();
        const updatedScores = mergeScores(scores, state.cash);
        saveScores(updatedScores.map((scoreItem) => scoreItem.score));

        await timeout(1000);

        return updatedScores;
    },
);

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

export const buyWeapon = createAction<{
    cost: number;
    value: number;
}>("buyWeapon");

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

export const gameReducer = (seed: string) =>
    createReducer(initialState(seed), (builder) => {
        builder
            .addCase(newGame.pending, (state) => {
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
                    screen: GameScreen.Trade,
                    wipe: {
                        ...state.wipe,
                        showing: false,
                    },
                };
            })
            .addCase(restart.pending, (state) => {
                state.wipe.content = {
                    contentType: "BlankWipe",
                };

                state.wipe.showing = true;

                return state;
            })
            .addCase(restart.fulfilled, (state, action) => {
                return {
                    ...initialState(action.payload),
                    wipe: {
                        ...state.wipe,
                        showing: false,
                    },
                };
            })
            .addCase(nextTurn.pending, (state) => {
                const nextTurnNumber = state.turnNumber + 1;

                if (nextTurnNumber === MAX_TURNS) {
                    state.wipe.content = {
                        contentType: "WipeFinalTurn",
                    };
                } else {
                    state.wipe.content = {
                        contentType: "WipeNextTurn",
                        displayTurn: nextTurnNumber + 1,
                    };
                }

                state.modal = { modalType: "NoModal" };
                state.wipe.showing = true;
            })
            .addCase(nextTurn.fulfilled, (state, action) => {
                const nextTurnNumber = state.turnNumber + 1;
                state.modal = { modalType: "NoModal" };
                state.wipe.showing = false;

                state.turnNumber = nextTurnNumber;
                state.townsVisited.push(action.payload.nextTown);

                const rngTable = state.rngTables[nextTurnNumber];

                state.event = getRandomEvent(
                    state,
                    rngTable.specialEvent,
                    rngTable.specialEventValue,
                );

                return state;
            })
            .addCase(showFinalScore.pending, (state) => {
                state.wipe.content = {
                    contentType: "WipeGameOver",
                };

                state.wipe.showing = true;

                return state;
            })
            .addCase(showFinalScore.fulfilled, (state, action) => {
                state.wipe.showing = false;
                state.screen = GameScreen.GameOver;
                state.scoreboard = action.payload;

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

                    const rngTable = state.rngTables[state.turnNumber];

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
            .addCase(buyWeapon, (state, action) => {
                const { cost, value } = action.payload;

                if (cost > state.cash) {
                    return state;
                }

                state.cash -= cost;
                state.strength += value;
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

export const townSelector = (state: RootState) => {
    return state.townsVisited[state.turnNumber];
};

export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;
export const currentRngTableSelector = (state: RootState) =>
    state.rngTables[state.turnNumber];
export const cashSelector = (state: RootState) => state.cash;
export const cargoSelector = (state: RootState) => state.cargo;
export const wipeSelector = (state: RootState) => state.wipe;
export const specialEventSelector = (state: RootState) => state.event;
export const scoreboardSelector = (state: RootState) => state.scoreboard;
export const screenSelector = (state: RootState) => state.screen;

export const visualTurnSelector = createSelector(
    [turnNumberSelector],
    (turnNumber) => ({
        turn: turnNumber + 1,
        maxTurns: MAX_TURNS + 1,
    }),
);

export const isLastTurnSelector = (state: RootState) =>
    state.turnNumber === MAX_TURNS;

export const playerSelector = (state: RootState): Fighter => {
    return {
        name: state.name,
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
    (town, cargo, rngTable) => {
        return getTeaForTurn(town, cargo, rngTable);
    },
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
    [turnNumberSelector, townSelector, rngTablesSelector, isLastTurnSelector],
    (currentTurn, town, rngTables, isLastTurn) => {
        if (isLastTurn) {
            // don't return any messages if player is on last turn
            return [];
        }

        // add one to current turn as we want the prices messages for the next turn
        return getPriceMessages(currentTurn + 1, town, rngTables);
    },
);
