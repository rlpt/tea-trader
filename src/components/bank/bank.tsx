import { useState } from "react";

interface DebtRepaymentProps {
    totalDebt: number;
    availableCash: number;
    onRepay: (amount: number) => void;
}

export function DebtRepayment({
    totalDebt,
    availableCash,
    onRepay,
}: DebtRepaymentProps) {
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
                <label>
                    Repayment Amount:
                    <input
                        type="number"
                        min={0}
                        max={maxRepayment}
                        value={repaymentAmount}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <input
                    type="range"
                    min={0}
                    max={maxRepayment}
                    value={repaymentAmount}
                    onChange={handleSliderChange}
                />
                <div>
                    <span>0</span>
                    <span>{maxRepayment}</span>
                </div>
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

// Add this where you want the repayment controls to appear
{/* <DebtRepayment
    totalDebt={totalDebt} // Replace with your debt state variable
    availableCash={availableCash} // Replace with your cash state variable
    onRepay={handleRepayDebt}
/>; */}
