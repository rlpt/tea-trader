import React from "react";

import {
    screenSelector,
    townSelector,
    visualTurnSelector,
} from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import { GameScreen } from "./app/types";
import BurgerMenuIcon from "./BugerMenuIcon";

import styles from "./Header.module.css";

export default function Header() {
    const town = useAppSelector(townSelector);
    const screen = useAppSelector(screenSelector);
    const turn = useAppSelector(visualTurnSelector);

    let townTxt = "";
    let turnTxt = "";

    if (screen === GameScreen.Trade) {
        townTxt = town;
        turnTxt = `Turn: ${turn.turn} / ${turn.maxTurns}`;
    }

    return (
        <div className={styles.header}>
            <div className={styles.menu}>
                <BurgerMenuIcon />
            </div>
            <div className={styles.town}>{townTxt}</div>
            <div className={styles.turns}>{turnTxt}</div>
        </div>
    );
}
