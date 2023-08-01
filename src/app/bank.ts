/**
 *  For now we are keeping this simple for now and using Math.ceil to
 *  keep the balance as an integer
 */
export function applyInterest(interest: number, balance: number) {
    const newBalance = Math.ceil(balance + interest * balance);

    return newBalance;
}
