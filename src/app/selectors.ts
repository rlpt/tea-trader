import { createSelector } from "@reduxjs/toolkit";
import { totalItems } from "./hold";
import { RootState } from "./store";
import { Hold } from "./types";

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
