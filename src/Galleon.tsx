import React from "react";
import cn from "classnames";

import { Fighter } from "./app/types";
import galleonImg from "./galleon.svg";
import { DEAD_ICON, DEFENSE_ICON, HEALTH_ICON, STRENGTH_ICON } from "./icons";

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
    const face = props.stats.health === 0 ? DEAD_ICON : props.face;

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
                <div>{STRENGTH_ICON}</div>
                <div>{props.stats.strength}</div>
                <div>{DEFENSE_ICON}</div>
                <div>{props.stats.defense}</div>
                <div>{HEALTH_ICON}</div>
                <div>{props.stats.health}</div>
            </div>
        </div>
    );
}

export default Galleon;
