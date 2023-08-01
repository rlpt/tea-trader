import { createAction, createReducer } from "@reduxjs/toolkit";
import { MAX_TURNS, initialState } from "./initialState";
import { holdTotalSelector } from "./selectors";
import { ActiveModal, Town } from "./types";

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

export const nextTurn = createAction<{ nextTown: Town }>("nextTurn");

export const gameReducer = (seed: string) =>
    createReducer(initialState(seed), (builder) => {
        builder
            .addCase(nextTurn, (state, action) => {
                const nextTurnNumber = state.turnNumber + 1;

                if (nextTurnNumber === MAX_TURNS) {
                    return state;
                }

                state.turnNumber = nextTurnNumber;
                state.town = action.payload.nextTown;
                state.modal = { modalType: "NoModal" };

                return state;
            })
            .addCase(showChangeLocationModal, (state) => {
                state.modal = { modalType: "NoModal" };

                return state;
            })
            .addCase(showBuySellModal, (state, action) => {
                state.modal = {
                    modalType: "BuySellModal",
                    tea: action.payload.tea,
                };

                return state;
            })
            .addCase(buyTea, (state, action) => {
                const { teaName, price, quantity } = action.payload;

                const holdTotal = holdTotalSelector(state);

                const totalPrice = price * quantity;

                if (totalPrice > state.cash) {
                    return state;
                }

                if (holdTotal.current + quantity > holdTotal.max) {
                    return state;
                }

                const newTeaQuantity =
                    state.hold.items[teaName].quantity + quantity;

                state.hold.items[teaName].quantity = newTeaQuantity;

                state.cash = state.cash - totalPrice;

                return state;
            })
            .addCase(sellTea, (state, action) => {
                const { teaName, price, quantity } = action.payload;

                const teaInHold = state.hold.items[teaName].quantity;

                if (quantity > teaInHold) {
                    return state;
                }

                state.cash = state.cash + quantity * price;

                state.hold.items[teaName].quantity = teaInHold - quantity;

                return state;
            });
    });
