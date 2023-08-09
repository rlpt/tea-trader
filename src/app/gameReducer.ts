import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

import { fight, run } from "./fight";
import { initialState, MAX_TURNS } from "./initialState";
import { getRngFromList } from "./rng";
import { cargoTotalSelector } from "./selectors";
import { FightOutcome, Town } from "./types";

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
    async (args: { nextTown: Town }, state) => {
        await timeout(1000);

        // TODO remove message
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

                state.turnNumber = nextTurnNumber;
                state.townsVisited.push(action.payload.nextTown);
                state.modal = { modalType: "NoModal" };

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
            })
            .addCase(fightMoveClicked, (state, action) => {
                const rngTable = state.rngTables[state.turnNumber];

                const rngForFight = getRngFromList(
                    state.fight.rngIndex,
                    4,
                    rngTable.fight,
                );

                const [rng1, rng2, rng3, rng4] = rngForFight.items;

                const fightAction =
                    action.payload === FightInput.FightClicked ? fight : run;

                const result = fightAction(
                    state,
                    state.npc,
                    rng1,
                    rng2,
                    rng3,
                    rng4,
                );

                state.fight.rngIndex = rngForFight.newIndex;
                state.fight.outcome = result.outcome;
                state.fight.messages.push(result.message);

                state.health = result.player.health;
                state.npc.health = result.opponent.health;

                if (result.outcome === FightOutcome.PlayerWins) {
                    state.cash += result.reward;
                }

                return state;
            });
    });

export function currentTown(townsVisited: Town[], turnNumber: number) {
    return townsVisited[turnNumber - 1];
}
