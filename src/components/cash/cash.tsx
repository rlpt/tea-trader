import React from "react";

import styles from "./cash.module.css";

export default function Cash(props: { amount: number; className?: string }) {
    return (
        <span className={props.className}>
            <span className={styles.pound}>£</span>
            {props.amount.toLocaleString()}
        </span>
    );
}
