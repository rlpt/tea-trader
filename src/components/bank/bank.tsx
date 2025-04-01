import { useState } from "react";

import { useAppSelector } from "../../game-logic/hooks";
import { financeSelector } from "../../game-logic/game-reducer";
import Cash from "../cash/cash";

import styles from "./bank.module.css";

export function Bank() {
    const { cash, debt } = useAppSelector(financeSelector);

    const maxRepayment = Math.min(debt, cash);
    const [repaymentAmount, setRepaymentAmount] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxRepayment);
        setRepaymentAmount(value);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepaymentAmount(Number(e.target.value));
    };

    return (
        <div>
            <div>
                <p>
                    Repay debt to bank. You owe <Cash amount={debt} /> and have{" "}
                    <Cash amount={cash} /> available.
                </p>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={0}
                    max={maxRepayment}
                    value={repaymentAmount}
                    onChange={handleInputChange}
                    className={styles.input}
                />
            </div>
            <div>
                <input
                    type="range"
                    min={0}
                    max={maxRepayment}
                    value={repaymentAmount}
                    onChange={handleSliderChange}
                />
            </div>
            <button
                // onClick={() => onRepay(repaymentAmount)}
                disabled={repaymentAmount <= 0}
            >
                Repay
            </button>
        </div>
    );
}
