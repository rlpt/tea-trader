import React from "react";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
    ALL_TEA_NAMES,
    SPECIAL_EVENT_MULTIPLIER,
    teaInfo,
} from "./app/initialState";
import { randomInRange } from "./app/rng";
import { RootState } from "./app/store";
import { createSelector } from "@reduxjs/toolkit";
import {
    holdSelector,
    rngTablesSelector,
    townSelector,
    turnNumberSelector,
} from "./app/selectors";
import "./TeaTable.css";
import Cash from "./Cash";
import { SpecialEvent } from "./app/types";
import { showBuySellModal } from "./app/gameReducer";

type TeaTableItem = {
    teaName: string;
    price: number;
    quantity: number;
    specialEvent: SpecialEvent;
};

const teaTableSelector = createSelector(
    [townSelector, turnNumberSelector, holdSelector, rngTablesSelector],
    (town, turnNumber, hold, rngTables) => {
        const rngTable = rngTables[turnNumber][town];

        const status: TeaTableItem[] = ALL_TEA_NAMES.map((teaName) => {
            const { lowPrice, highPrice } = teaInfo[teaName];
            const { randomNumber, specialEvent } = rngTable.teaPrice[teaName];

            let price = randomInRange(lowPrice, highPrice, randomNumber);

            if (specialEvent === SpecialEvent.HighPrice) {
                price = price * SPECIAL_EVENT_MULTIPLIER;
            }

            if (specialEvent === SpecialEvent.LowPrice) {
                price = Math.ceil(price / SPECIAL_EVENT_MULTIPLIER);
            }

            const { quantity } = hold.items[teaName];

            return {
                teaName,
                price,
                quantity,
                specialEvent,
            };
        });

        return status;
    },
);

function TeaTable() {
    const dispatch = useAppDispatch();
    const teaList = useAppSelector(teaTableSelector);

    const rows = teaList.map(({ teaName, price, quantity }) => {
        let quantityEl = <td></td>;

        if (quantity > 0) {
            quantityEl = <td>{quantity}</td>;
        }

        return (
            <tr
                key={teaName}
                onClick={() => dispatch(showBuySellModal({ tea: teaName }))}
            >
                <td>{teaName}</td>
                {quantityEl}
                <td>
                    <Cash amount={price} />
                </td>
            </tr>
        );
    });

    return (
        <table className="tea-table">
            <tbody>{rows}</tbody>
        </table>
    );
}

export default TeaTable;
