import React from "react";
import cn from "classnames";

import { Fighter } from "./app/types";
import galleonImg from "./galleon.svg";

import styles from "./Galleon.module.css";

export enum Direction {
    FacingLeft,
    FacingRight,
}

function Galleon(props: {
    face: string;
    direction: Direction;
    stats: Fighter;
}) {
    const defenseIcon = "🛡";
    const attackIcon = "💥";
    const healthIcon = "💚";
    const deadIcon = "💀";

    const face = props.stats.health === 0 ? deadIcon : props.face;

    return (
        <div className={styles.galleon}>
            <div
                className={cn({
                    [styles.facingLeft]:
                        props.direction === Direction.FacingLeft,
                })}
            >
                <img src={galleonImg} alt="galleon" />
                <div className={styles.face}>{face}</div>
            </div>
            <div className={styles.stats}>
                <div>{attackIcon}</div>
                <div>{props.stats.strength}</div>
                <div>{defenseIcon}</div>
                <div>{props.stats.defense}</div>
                <div>{healthIcon}</div>
                <div>{props.stats.health}</div>
            </div>
        </div>
    );
}

export default Galleon;
