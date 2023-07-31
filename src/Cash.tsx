import React from "react";

function Cash(props: { amount: number }) {
    return <span>£{props.amount.toLocaleString()}</span>;
}

export default Cash;
