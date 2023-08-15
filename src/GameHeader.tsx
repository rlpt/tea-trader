import React from "react";

import { visualTurnSelector } from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import { RESET_ICON, TROPHY_ICON } from "./icons";

import styles from "./GameHeader.module.css";

function GameHeader() {
    const visualTurn = useAppSelector(visualTurnSelector);

    return (
        <div className={styles.gameHeader}>
            <div className={styles.options}>
                <div className={styles.icon}>{TROPHY_ICON}</div>
                <div className={styles.icon}>{RESET_ICON}</div>
            </div>
            <div className={styles.town}>London</div>
            <div className={styles.turn}>
                Turn: {visualTurn.turn} / {visualTurn.maxTurns}
            </div>
        </div>
    );
}

export default GameHeader;
