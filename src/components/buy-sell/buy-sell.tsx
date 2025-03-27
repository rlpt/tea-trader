import React, { useState } from "react";

import { buyTea, closeModal, sellTea } from "../../game-logic/game-reducer";
import {
    cargoSelector,
    cargoTotalSelector,
    cashSelector,
    teaPriceSelector,
} from "../../game-logic/game-reducer";
import { useAppDispatch, useAppSelector } from "../../game-logic/hooks";
import Button from "../button/button";
import Cash from "../cash/cash";

import styles from "./buy-sell.module.css";

const StatusOptions = {
    Choose: "CHOOSE",
    Sell: "SELL",
    Buy: "BUY",
} as const;

type Status = (typeof StatusOptions)[keyof typeof StatusOptions];

function BuySell(props: { tea: string }) {
    const dispatch = useAppDispatch();

    const cargo = useAppSelector(cargoSelector);
    const cash = useAppSelector(cashSelector);
    const cargoTotal = useAppSelector(cargoTotalSelector);
    const teaPrices = useAppSelector(teaPriceSelector);

    const cargoTeaQty = cargo.items[props.tea];

    let initialStatus: Status = StatusOptions.Buy;

    const teaPrice = teaPrices[props.tea];

    const canAfford = Math.floor(cash / teaPrice.price);
    const canFit = cargoTotal.max - cargoTotal.current;

    let buyMaxQty = canAfford;

    if (canFit < canAfford) {
        buyMaxQty = canFit;
    }

    if (cargoTeaQty > 0) {
        initialStatus = StatusOptions.Choose;
    }

    const [status, setStatus] = useState<Status>(initialStatus);
    const [inputQty, setInputQty] = useState<number | null>(buyMaxQty);

    // Add state for button press intervals
    const [buttonInterval, setButtonInterval] = useState<NodeJS.Timeout | null>(
        null,
    );

    const numberInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const result = event.target.value.replace(/\D/g, "");

        if (event.target.value === "") {
            return null;
        } else {
            return +result;
        }
    };

    const qty = inputQty === null ? 0 : inputQty;

    // Handle button press start
    const handleButtonPress = (increment: boolean) => {
        // Clear any existing interval
        if (buttonInterval) {
            clearInterval(buttonInterval);
        }

        // Initial change
        updateQuantity(increment);

        // Set up repeat interval
        const interval = setInterval(() => {
            updateQuantity(increment);
        }, 150); // Adjust repeat rate as needed

        setButtonInterval(interval);
    };

    // Handle button release
    const handleButtonRelease = () => {
        if (buttonInterval) {
            clearInterval(buttonInterval);
            setButtonInterval(null);
        }
    };

    const updateQuantity = (increment: boolean) => {
        setInputQty((prevQty) => {
            const currentQty = prevQty ?? 0;
            const newQty = increment ? currentQty + 1 : currentQty - 1;

            if (status === StatusOptions.Buy) {
                if (newQty >= 0 && newQty <= buyMaxQty) {
                    return newQty;
                }
            } else if (status === StatusOptions.Sell) {
                if (newQty >= 0 && newQty <= cargoTeaQty) {
                    return newQty;
                }
            }

            return prevQty;
        });
    };

    // Update the input sections in both Buy and Sell content blocks
    const quantityInput = (
        <div className={styles.quantityContainer}>
            <Button
                secondary
                onMouseDown={() => handleButtonPress(false)}
                onMouseUp={handleButtonRelease}
                onMouseLeave={handleButtonRelease}
                onTouchStart={() => handleButtonPress(false)}
                onTouchEnd={handleButtonRelease}
            >
                -
            </Button>
            <input
                className={styles.input}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={inputQty === null ? "" : inputQty}
                onChange={(e) => {
                    setInputQty(numberInput(e));
                }}
            />
            <Button
                secondary
                onMouseDown={() => handleButtonPress(true)}
                onMouseUp={handleButtonRelease}
                onMouseLeave={handleButtonRelease}
                onTouchStart={() => handleButtonPress(true)}
                onTouchEnd={handleButtonRelease}
            >
                +
            </Button>
        </div>
    );

    let content;

    if (status === StatusOptions.Choose) {
        content = (
            <div>
                <p>
                    You own {cargoTeaQty} of {teaPrice.teaName}, do you want to
                    buy or sell?
                </p>
                <div className="buttons">
                    <Button onClick={() => setStatus(StatusOptions.Buy)}>
                        Buy
                    </Button>
                    <Button
                        onClick={() => {
                            setStatus(StatusOptions.Sell);
                            setInputQty(cargoTeaQty);
                        }}
                    >
                        Sell
                    </Button>
                </div>
            </div>
        );
    } else if (status === StatusOptions.Buy) {
        const qtyInvalid = qty > buyMaxQty || qty === 0;

        content = (
            <div>
                <p>
                    You can afford {canAfford} of {teaPrice.teaName}, and have
                    cargo space for {canFit}
                </p>
                <p>
                    Total cost for {qty} is&nbsp;
                    <Cash amount={qty * teaPrice.price} />
                </p>
                {quantityInput}
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
    } else if (status === StatusOptions.Sell) {
        const qtyInvalid = qty === 0 || qty > cargoTeaQty;

        content = (
            <div>
                <p>
                    You have {cargoTeaQty} of {teaPrice.teaName}.
                </p>
                <p>
                    Sell {qty} of {teaPrice.teaName} for&nbsp;{" "}
                    <Cash amount={qty * teaPrice.price} />?
                </p>
                {quantityInput}
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
