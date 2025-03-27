export function calculateDebtPeriod(
    principal: number,
    interestRate: number,
): number {
    return Math.floor(principal * (1 + interestRate));
}

export function makeDebtPayment(
    currentDebt: number,
    paymentAmount: number,
): number {
    return Math.max(0, currentDebt - paymentAmount);
}
