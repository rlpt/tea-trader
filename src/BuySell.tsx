import React, { useState } from "react";

import { buyTea, closeModal, sellTea } from "./app/gameReducer";
import {
    cargoSelector,
    cargoTotalSelector,
    cashSelector,
    teaPriceSelector,
} from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Button from "./Button";
import Cash from "./Cash";

import styles from "./BuySell.module.css";

enum Status {
    Choose,
    Sell,
    Buy,
}

function BuySell(props: { tea: string }) {
    const dispatch = useAppDispatch();

    const hold = useAppSelector(cargoSelector);
    const cash = useAppSelector(cashSelector);
    const holdTotal = useAppSelector(cargoTotalSelector);
    const teaPrices = useAppSelector(teaPriceSelector);

    const holdTeaQty = hold.items[props.tea];

    let initialStatus = Status.Buy;

    const teaPrice = teaPrices[props.tea];

    const canAfford = Math.floor(cash / teaPrice.price);
    const canFit = holdTotal.max - holdTotal.current;

    let buyMaxQty = canAfford;

    if (canFit < canAfford) {
        buyMaxQty = canFit;
    }

    if (holdTeaQty > 0) {
        initialStatus = Status.Choose;
    }

    const [status, setStatus] = useState<Status>(initialStatus);
    const [inputQty, setInputQty] = useState<number | null>(buyMaxQty);

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
                <div className="buttons">
                    <Button onClick={() => setStatus(Status.Buy)}>Buy</Button>
                    <Button
                        onClick={() => {
                            setStatus(Status.Sell);
                            setInputQty(holdTeaQty);
                        }}
                    >
                        Sell
                    </Button>
                </div>
            </div>
        );
    } else if (status === Status.Buy) {
        const qtyInvalid = qty > buyMaxQty || qty === 0;

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
                        className={styles.input}
                        type="number"
                        value={inputQty === null ? "" : inputQty}
                        onChange={(e) => {
                            setInputQty(numberInput(e));
                        }}
                    />
                </p>
                <div className="buttons">
                    <Button
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
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                        secondary
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    } else if (status === Status.Sell) {
        const qtyInvalid = qty === 0 || qty > holdTeaQty;

        content = (
            <div>
                <p>
                    You have {holdTeaQty} of {teaPrice.teaName}.
                </p>
                <p>
                    Sell {qty} of {teaPrice.teaName} for&nbsp;{" "}
                    <Cash amount={qty * teaPrice.price} />?
                </p>
                <p>
                    <input
                        className={styles.input}
                        type="number"
                        value={inputQty === null ? "" : inputQty}
                        onChange={(e) => {
                            setInputQty(numberInput(e));
                        }}
                    />
                </p>
                <div className="buttons">
                    <Button
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
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(closeModal());
                        }}
                        secondary
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    return <div>{content}</div>;
}

export default BuySell;
