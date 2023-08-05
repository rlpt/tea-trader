import React from "react";

function Cash(props: { amount: number }) {
    return (
        <span>
            <span className="pound-sign">£</span>
            {props.amount.toLocaleString()}
        </span>
    );
}

export default Cash;
