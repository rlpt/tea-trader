import React from "react";
import cn from "classnames";

import galleonImg from "./galleon.svg";

import styles from "./Galleon.module.css";

export enum Direction {
    FacingLeft,
    FacingRight,
}

function Galleon(props: { face: string; direction: Direction }) {
    const shield = "🛡";
    const attack = "💥";
    const health = "💚";

    return (
        <div>
            <div
                className={cn({
                    [styles.facingLeft]:
                        props.direction === Direction.FacingLeft,
                    [styles.galleon]: true,
                })}
            >
                <img src={galleonImg} alt="galleon" />
                <div className={styles.face}>{props.face}</div>
            </div>
            <div className={styles.stats}>
                <div>{attack}</div>
                <div>20</div>
                <div>{shield}</div>
                <div>5</div>
                <div>{health}</div>
                <div>100</div>
            </div>
        </div>
    );
}

export default Galleon;
