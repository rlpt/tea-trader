import { createAction, createReducer } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { holdTotalSelector } from "./selectors";

export const buyTea = createAction<{
    teaName: string;
    price: number;
    quantity: number;
}>("buyTea");

export const gameReducer = (seed: string) =>
    createReducer(initialState(seed), (builder) => {
        builder.addCase(buyTea, (state, action) => {
            const { teaName, price, quantity } = action.payload;

            const holdTotal = holdTotalSelector(state);

            const totalPrice = price * quantity;

            if (totalPrice > state.cash) {
                return state;
            }

            if (holdTotal.current + quantity > holdTotal.max) {
                return state;
            }

            console.log("ok");

            return state;
        });
    });
