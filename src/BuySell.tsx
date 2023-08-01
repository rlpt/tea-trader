import React, { useState } from "react";
import { useAppSelector } from "./app/hooks";
import { holdSelector } from "./app/selectors";

enum Status {
    Choose,
    Sell,
    Buy,
}

function BuySellModal(props: { tea: string }) {
    const hold = useAppSelector(holdSelector);
    const holdTeaQty = hold.items[props.tea].quantity;

    let initialStatus = Status.Buy;

    if (holdTeaQty > 0) {
        initialStatus = Status.Choose;
    }

    const [status, setStatus] = useState(initialStatus);
    const [qty, setQty] = useState(0);

    const { tea } = props;

    const upQty = (qty: number) => {
        return qty + 1;
    };

    console.log(status, qty);

    // CHOOSE
    // you own x units of y, do you want to buy or sell?

    // SELL
    // You have x units of Y
    // Sell z for $p?

    // BUY
    // You can afford 97 units of Y, and have room in the
    // hold for 85
    // Toal cost for 85 is £p

    return (
        <div>
            {tea}

            <button onClick={() => setQty(upQty)}>UP</button>
            <button onClick={() => setStatus(Status.Choose)}>CHOSE</button>
        </div>
    );
}

export default BuySellModal;
