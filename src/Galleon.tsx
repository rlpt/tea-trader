import React from "react";
import cn from "classnames";

import { Fighter } from "./app/types";
import FighterStats from "./fighter-stats";
import { DEAD_ICON } from "./icons";

import styles from "./Galleon.module.css";

function Galleon(props: {
    face: string;
    facingLeft?: boolean;
    stats: Fighter;
    name: string;
    animationClasses: string;
}) {
    const face = props.stats.health === 0 ? DEAD_ICON : props.face;

    return (
        <div className={styles.galleon}>
            <div className={styles.name}>{props.name}</div>
            <div
                className={cn(styles.imgWrap, props.animationClasses, {
                    [styles.imgWrapLeft]: props.facingLeft,
                })}
            >
                <div
                    className={cn(styles.face, {
                        [styles.faceLeft]: props.facingLeft,
                    })}
                >
                    {face}
                </div>
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
