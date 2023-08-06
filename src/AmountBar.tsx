import React from "react";

import "./AmountBar.css";

function AmountBar(props: {
    value: number;
    max: number;
    label: string;
    color: string;
}) {
    const barWidth = (props.value / props.max) * 100;

    return (
        <div className="amount-bar">
            <div
                className="progress-bar"
                style={{ backgroundColor: props.color, width: `${barWidth}%` }}
            ></div>
            <div className="value">
                {props.label}: {props.value} / {props.max}
            </div>
        </div>
    );
}

export default AmountBar;
