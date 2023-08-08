import { createSelector } from "@reduxjs/toolkit";

import { totalItems } from "./cargo";
import { currentTown, getTeaForTurn, previousTown } from "./gameReducer";
import { RootState } from "./store";
import { Cargo, Fighter, FightOutcome } from "./types";

export const townSelector = (state: RootState) => {
    return currentTown(state.townsVisited, state.turnNumber);
};

export const prevTownSelector = (state: RootState) => {
    return previousTown(state.townsVisited, state.turnNumber);
};

export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;
export const cashSelector = (state: RootState) => state.cash;
export const cargoSelector = (state: RootState) => state.cargo;
export const wipeSelector = (state: RootState) => state.wipe;
export const npcSelector = (state: RootState) => state.npc;
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
    [
        townSelector,
        prevTownSelector,
        turnNumberSelector,
        cargoSelector,
        rngTablesSelector,
    ],
    getTeaForTurn,
);

export const fightSelector = createSelector(
    [(state: RootState) => state.fight, playerSelector, npcSelector],
    (
        fight,
        player,
        npc,
    ): { outcome: FightOutcome; player: Fighter; opponent: Fighter } => {
        return {
            outcome: fight.outcome,
            player,
            opponent: npc,
        };
    },
);
