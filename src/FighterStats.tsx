import React from "react";

import { DEFENSE_ICON, HEALTH_ICON, STRENGTH_ICON } from "./icons";

import styles from "./FighterStats.module.css";

function FighterStats(props: {
    health: number;
    strength: number;
    defense: number;
}) {
    return (
        <div className={styles.stats}>
            <div>{STRENGTH_ICON}</div>
            <div>{props.strength}</div>
            <div>{DEFENSE_ICON}</div>
            <div>{props.defense}</div>
            <div>{HEALTH_ICON}</div>
            <div>{props.health}</div>
        </div>
    );
}

export default FighterStats;
