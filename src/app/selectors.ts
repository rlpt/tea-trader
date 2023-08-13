import { createSelector } from "@reduxjs/toolkit";

import { totalItems } from "./cargo";
import { currentTown } from "./gameReducer";
import { getPriceMessages } from "./priceMessages";
import { RootState } from "./store";
import { getTeaForTurn } from "./teaPrice";
import { Cargo, Fighter, FightInProgress } from "./types";

export const townSelector = (state: RootState) => {
    return currentTown(state.townsVisited, state.turnNumber);
};

export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;
export const cashSelector = (state: RootState) => state.cash;
export const cargoSelector = (state: RootState) => state.cargo;
export const wipeSelector = (state: RootState) => state.wipe;
export const specialEventSelector = (state: RootState) => state.event;

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
    [townSelector, turnNumberSelector, cargoSelector, rngTablesSelector],
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
