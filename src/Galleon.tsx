import React from "react";
import cn from "classnames";

import { Fighter } from "./app/types";
import FighterStats from "./FighterStats";
import galleonImg from "./galleon.svg";
import { DEAD_ICON } from "./icons";

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
            <FighterStats
                health={props.stats.health}
                strength={props.stats.strength}
                defense={props.stats.defense}
            />
        </div>
    );
}

export default Galleon;
