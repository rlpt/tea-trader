import { showBuySellModal } from "./app/gameReducer";
import { teaPriceSelector } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { PriceChange, PriceEvent } from "./app/types";
import Cash from "./Cash";

import "./TeaTable.css";

function TeaTable() {
    const dispatch = useAppDispatch();
    const teaMap = useAppSelector(teaPriceSelector);

    const rows = Object.values(teaMap).map(
        ({ teaName, price, quantity, priceChange, specialEvent }) => {
            let quantityEl = <td></td>;

            if (quantity > 0) {
                quantityEl = <td>{quantity}</td>;
            }

            let priceChangeEl = "";

            if (
                priceChange === PriceChange.PriceIncrease ||
                specialEvent === PriceEvent.HighPrice
            ) {
                priceChangeEl = "⬆️";
            } else if (
                priceChange === PriceChange.PriceDecrease ||
                specialEvent === PriceEvent.LowPrice
            ) {
                priceChangeEl = "⬇️";
            }

            let specialEventEl = <></>;

            if (specialEvent !== PriceEvent.NoPriceEvent) {
                specialEventEl = <span title="Big price movement">❗</span>;
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
                    <td>
                        {priceChangeEl}
                        {specialEventEl}
                    </td>
                </tr>
            );
        },
    );

    // TODO tooltip for price movements

    return (
        <table className="tea-table">
            <thead>
                <tr>
                    <th>Tea</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default TeaTable;
