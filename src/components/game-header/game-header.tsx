import React from "react";

import { visualTurnSelector } from "../../game-logic/game-reducer";
import { useAppSelector } from "../../game-logic/hooks";

import styles from "./game-header.module.css";

function GameHeader() {
    const visualTurn = useAppSelector(visualTurnSelector);

    return (
        <div className={styles.gameHeader}>
            <div className={styles.town}>London</div>
            <div className={styles.turn}>
                Turn: {visualTurn.turn} / {visualTurn.maxTurns}
            </div>
        </div>
    );
}

export default GameHeader;
