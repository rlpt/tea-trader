export function calculateDebtPeriod(principal: number, interestRate: number): number {
    return Math.floor(principal * (1 + interestRate));
}
