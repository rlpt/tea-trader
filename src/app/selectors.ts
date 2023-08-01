import { createSelector } from "@reduxjs/toolkit";
import { totalItems } from "./hold";
import { RootState } from "./store";
import { Hold } from "./types";

export const townSelector = (state: RootState) => state.town;
export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;

export const holdSelector = (state: RootState) => state.hold;

export const holdTotalSelector = createSelector(
    [holdSelector],
    (hold: Hold) => {
        return {
            current: totalItems(hold.items),
            max: hold.maxSize,
        };
    },
);
