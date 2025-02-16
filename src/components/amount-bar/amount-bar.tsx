import React from "react";

import styles from "./amount-bar.module.css";

function AmountBar(props: {
    value: number;
    max: number;
    label: string;
    color: string;
}) {
    const barWidth = (props.value / props.max) * 100;

    return (
        <div className={styles.amountBar}>
            <div
                className={styles.progressBar}
                style={{ backgroundColor: props.color, width: `${barWidth}%` }}
            ></div>
            <div className={styles.value}>
                {props.label}: {props.value} / {props.max}
            </div>
        </div>
    );
}

export default AmountBar;
