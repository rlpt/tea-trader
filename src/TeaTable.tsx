import { useAppSelector, useAppDispatch } from "./app/hooks";
import { teaPriceSelector } from "./app/selectors";
import "./TeaTable.css";
import Cash from "./Cash";
import { showBuySellModal } from "./app/gameReducer";
import { PriceChange, SpecialEvent } from "./app/types";

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

            if (priceChange === PriceChange.PriceIncrease) {
                priceChangeEl = "⬆️";
            } else if (priceChange === PriceChange.PriceDecrease) {
                priceChangeEl = "⬇️";
            }

            let specialEventEl = "";

            if (specialEvent !== SpecialEvent.NoSpecialEvent) {
                specialEventEl = "❗";
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

    return (
        <table className="tea-table">
            <tbody>{rows}</tbody>
        </table>
    );
}

export default TeaTable;
