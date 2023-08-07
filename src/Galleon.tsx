import React from "react";
import cn from "classnames";

import galleonImg from "./galleon.svg";

import styles from "./Galleon.module.css";

export enum Direction {
    FacingLeft,
    FacingRight,
}

function Galleon(props: { face: string; direction: Direction }) {
    const pirate = "☠️";

    return (
        <div
            className={cn({
                [styles.facingLeft]: props.direction === Direction.FacingLeft,
                [styles.galleon]: true,
            })}
        >
            <img src={galleonImg} alt="galleon" />
            <div className={styles.face}>{props.face}</div>
        </div>
    );
}

export default Galleon;
