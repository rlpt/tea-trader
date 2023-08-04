import { createSelector } from "@reduxjs/toolkit";
import { totalItems } from "./cargo";
import { RootState } from "./store";
import { Cargo } from "./types";
import { getTeaForTurn } from "./gameReducer";

export const townSelector = (state: RootState) => {
    return state.townsVisited[state.turnNumber - 1];
};

export const prevTownSelector = (state: RootState) => {
    if (state.turnNumber === 1) {
        // return first town as previously visited town when we are on first turn
        // this avoids a null and works fine for comparing previous prices as
        // the prices will be the same
        return state.townsVisited[0];
    }

    return state.townsVisited[state.turnNumber - 2];
};

export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;
export const cashSelector = (state: RootState) => state.cash;
export const cargoSelector = (state: RootState) => state.cargo;
export const wipeSelector = (state: RootState) => state.wipe;

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

export const messageSelector = (state: RootState) => {
    if (state.modal.modalType === "MessageModal") {
        return state.modal.message;
    }

    return "";
};
