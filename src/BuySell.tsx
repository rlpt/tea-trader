import React, { ReactEventHandler, useState } from "react";
import { useAppSelector } from "./app/hooks";
import {
    cashSelector,
    holdSelector,
    holdTotalSelector,
    teaPriceSelector,
} from "./app/selectors";
import Cash from "./Cash";

enum Status {
    Choose,
    Sell,
    Buy,
}

function BuySellModal(props: { tea: string }) {
    const hold = useAppSelector(holdSelector);
    const cash = useAppSelector(cashSelector);
    const holdTotal = useAppSelector(holdTotalSelector);
    const teaPrices = useAppSelector(teaPriceSelector);

    const holdTeaQty = hold.items[props.tea].quantity;

    let initialStatus = Status.Buy;

    const teaPrice = teaPrices[props.tea];

    const canAfford = Math.floor(cash / teaPrice.price);
    const canFit = holdTotal.max - holdTotal.current;

    let initialMaxQty = canAfford;

    if (canFit < canAfford) {
        initialMaxQty = canFit;
    }

    if (holdTeaQty > 0) {
        initialStatus = Status.Choose;
    }

    const [status, setStatus] = useState(initialStatus);
    const [maxQty, setMaxQty] = useState(initialMaxQty);
    const [qty, setQty] = useState<number | null>(initialMaxQty);

    // CHOOSE
    // you own x units of y, do you want to buy or sell?

    // SELL
    // You have x units of Y
    // Sell z for $p?

    // BUY
    // You can afford 97 units of Y, and have room in the
    // hold for 85
    // Toal cost for 85 is £p

    const numberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const result = event.target.value.replace(/\D/g, "");

        if (event.target.value === "") {
            return null;
        } else {
            return +result;
        }
    };

    let content;

    if (status === Status.Choose) {
        content = <div>Choose</div>;
    } else if (Status.Buy) {
        const displayQty = qty === null ? 0 : qty;

        const qtyInvalid = displayQty > maxQty || displayQty === 0;

        content = (
            <div>
                <p>
                    You can afford {canAfford} of {teaPrice.teaName}, and can
                    fit {canFit} in the hold.
                </p>
                <p>
                    Total cost for {displayQty} is&nbsp;
                    <Cash amount={displayQty * teaPrice.price} />
                </p>
                <p>
                    <input
                        type="number"
                        value={qty === null ? "" : qty}
                        onChange={(e) => {
                            setQty(numberInput(e));
                        }}
                    />
                </p>
                <p>
                    <button disabled={qtyInvalid}>Buy</button>
                </p>
            </div>
        );
    } else if (Status.Sell) {
        content = <div>Sell</div>;
    }

    return <div>{content}</div>;
}

export default BuySellModal;
