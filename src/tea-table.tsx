import { showBuySellModal } from "./app/game-reducer";
import { teaPriceSelector } from "./app/game-reducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Price, PriceEvent } from "./app/types";
import Cash from "./cash";

import styles from "./tea-table.module.css";

function TeaTable() {
    const dispatch = useAppDispatch();
    const teaMap = useAppSelector(teaPriceSelector);

    const rows = Object.values(teaMap).map(
        ({ teaName, price, quantity, priceAvg: priceChange, specialEvent }) => {
            let quantityEl = <td></td>;

            if (quantity > 0) {
                quantityEl = <td>{quantity}</td>;
            }

            let priceChangeEl = <></>;

            if (
                priceChange === Price.AboveAvg ||
                specialEvent === PriceEvent.HighPrice
            ) {
                priceChangeEl = <span title="Above average price">⬆️</span>;
            } else if (
                priceChange === Price.BelowAvg ||
                specialEvent === PriceEvent.LowPrice
            ) {
                priceChangeEl = <span title="Below average price">⬇️</span>;
            }

            let bigPriceChange = <></>;

            if (specialEvent !== PriceEvent.NoPriceEvent) {
                bigPriceChange = <span title="Big price movement!">❗</span>;
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
                        {bigPriceChange}
                    </td>
                </tr>
            );
        },
    );

    return (
        <table className={styles.table}>
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
