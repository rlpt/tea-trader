import React from "react";

import styles from "./Cash.module.css";

export default function Cash(props: { amount: number }) {
    return (
        <span>
            <span className={styles.pound}>£</span>
            {props.amount.toLocaleString()}
        </span>
    );
}
