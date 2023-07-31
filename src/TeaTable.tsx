import React from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { ALL_TEA_NAMES, teaInfo } from "./app/initialState";
import { randomInRange } from "./app/rng";
import { RootState } from "./app/store";
import { createSelector } from "@reduxjs/toolkit";
import { holdSelector } from "./app/selectors";
import { buyTea, sellTea } from "./app/gameReducer";

type TeaTableItem = {
    teaName: string;
    price: number;
    quantity: number;
    lastBuyPrice: number;
};

const turnNumberSelector = (state: RootState) => state.turnNumber;
const rngTablesSelector = (state: RootState) => state.rngTables;

const teaTableSelector = createSelector(
    [turnNumberSelector, holdSelector, rngTablesSelector],
    (turnNumber, hold, rngTables) => {
        const rngTable = rngTables[turnNumber];

        const status: TeaTableItem[] = ALL_TEA_NAMES.map((teaName) => {
            const { lowPrice, highPrice } = teaInfo[teaName];
            const randomNumber = rngTable.teaPrice[teaName];

            const price = randomInRange(lowPrice, highPrice, randomNumber);

            const { quantity, lastBuyPrice } = hold.items[teaName];

            return {
                teaName,
                price,
                quantity,
                lastBuyPrice,
            };
        });

        return status;
    },
);

function TeaTable() {
    const dispatch = useAppDispatch();

    const teaList = useAppSelector(teaTableSelector);

    const rows = teaList.map(({ teaName, price, quantity, lastBuyPrice }) => {
        let quantityEl = <td></td>;

        if (quantity > 0) {
            quantityEl = (
                <td>
                    {quantity} @ £{lastBuyPrice}
                </td>
            );
        }

        return (
            <tr key={teaName}>
                <td>{teaName}</td>
                {quantityEl}
                <td>£{price}</td>
            </tr>
        );
    });

    return (
        <table>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default TeaTable;
