import { useState } from "react";

import Cash from "../cash/cash";

import styles from "./bank.module.css";

interface BankProps {
    totalDebt: number;
    availableCash: number;
    onRepay: (amount: number) => void;
}

export function Bank({ totalDebt, availableCash, onRepay }: BankProps) {
    const maxRepayment = Math.min(totalDebt, availableCash);
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
                    Repay debt to bank. You owe <Cash amount={totalDebt} /> and
                    have <Cash amount={availableCash} /> available.
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
                onClick={() => onRepay(repaymentAmount)}
                disabled={repaymentAmount <= 0}
            >
                Repay
            </button>
        </div>
    );
}
