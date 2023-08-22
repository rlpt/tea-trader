import React from "react";

import styles from "./Cash.module.css";

function Cash(props: { amount: number }) {
    return (
        <span>
            <span className={styles.pound}>£</span>
            {props.amount.toLocaleString()}
        </span>
    );
}

export default Cash;
