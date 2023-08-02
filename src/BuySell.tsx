import React, { ReactEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    cashSelector,
    holdSelector,
    holdTotalSelector,
    teaPriceSelector,
} from "./app/selectors";
import Cash from "./Cash";
import { buyTea, closeModal, sellTea } from "./app/gameReducer";

enum Status {
    Choose,
    Sell,
    Buy,
}

function BuySellModal(props: { tea: string }) {
    const dispatch = useAppDispatch();

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

    const [status, setStatus] = useState<Status>(initialStatus);
    const [maxQty, setMaxQty] = useState<number>(initialMaxQty);
    const [inputQty, setInputQty] = useState<number | null>(initialMaxQty);

    const numberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const result = event.target.value.replace(/\D/g, "");

        if (event.target.value === "") {
            return null;
        } else {
            return +result;
        }
    };

    const qty = inputQty === null ? 0 : inputQty;

    let content;

    if (status === Status.Choose) {
        content = (
            <div>
                <p>
                    You own {holdTeaQty} of {teaPrice.teaName}, do you want to
                    buy or sell?
                </p>
                <p>
                    <button onClick={() => setStatus(Status.Buy)}>Buy</button>
                    <button
                        onClick={() => {
                            setStatus(Status.Sell);
                            setInputQty(holdTeaQty);
                        }}
                    >
                        Sell
                    </button>
                </p>
            </div>
        );
    } else if (status === Status.Buy) {
        const qtyInvalid = qty > maxQty || qty === 0;

        content = (
            <div>
                <p>
                    You can afford {canAfford} of {teaPrice.teaName}, and can
                    fit {canFit} in the hold.
                </p>
                <p>
                    Total cost for {qty} is&nbsp;
                    <Cash amount={qty * teaPrice.price} />
                </p>
                <p>
                    <input
                        type="number"
                        value={inputQty === null ? "" : inputQty}
                        onChange={(e) => {
                            setInputQty(numberInput(e));
                        }}
                    />
                </p>
                <p>
                    <button
                        disabled={qtyInvalid}
                        onClick={() => {
                            dispatch(
                                buyTea({
                                    teaName: props.tea,
                                    price: teaPrice.price,
                                    quantity: qty,
                                }),
                            );

                            dispatch(closeModal());
                        }}
                    >
                        Buy
                    </button>
                </p>
            </div>
        );
    } else if (status === Status.Sell) {
        const qtyInvalid = false;

        content = (
            <div>
                <p>
                    You have {holdTeaQty} of {teaPrice.teaName}.
                </p>
                <p>
                    Sell {qty} of {teaPrice.teaName} for&nbsp;{" "}
                    <Cash amount={qty * teaPrice.price} />
                    ?.
                </p>
                <p>
                    <button
                        disabled={qtyInvalid}
                        onClick={() => {
                            dispatch(
                                sellTea({
                                    teaName: props.tea,
                                    price: teaPrice.price,
                                    quantity: qty,
                                }),
                            );

                            dispatch(closeModal());
                        }}
                    >
                        Sell
                    </button>
                </p>
            </div>
        );
    }

    return <div>{content}</div>;
}

export default BuySellModal;
