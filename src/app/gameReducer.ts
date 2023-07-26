import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { Tea } from "./types";

const passTurn = createAction("passTurn");
const buyTea = createAction<{ tea: Tea; quantity: number }>("buyTea");

export const gameReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(passTurn, (state) => state)
        .addCase(buyTea, (state, action) => {
            const { tea, quantity } = action.payload;

            let teaInHold = state.hold.items[tea];

            return state;
        });
});
