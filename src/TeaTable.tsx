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
    teaPriceSelector,
    townSelector,
    turnNumberSelector,
} from "./app/selectors";
import "./TeaTable.css";
import Cash from "./Cash";
import { SpecialEvent } from "./app/types";
import { showBuySellModal } from "./app/gameReducer";

function TeaTable() {
    const dispatch = useAppDispatch();
    const teaMap = useAppSelector(teaPriceSelector);

    const rows = Object.values(teaMap).map(({ teaName, price, quantity }) => {
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
