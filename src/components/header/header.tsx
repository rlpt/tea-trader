import React from "react";

import {
    screenSelector,
    showMenu,
    townSelector,
    visualTurnSelector,
} from "../../game-logic/game-reducer";
import { useAppDispatch, useAppSelector } from "../../game-logic/hooks";
import { GameScreen } from "../../game-logic/types";
import BurgerMenuIcon from "../burger-menu-icon/burger-menu-icon";

import styles from "./header.module.css";

export default function Header() {
    const town = useAppSelector(townSelector);
    const screen = useAppSelector(screenSelector);
    const turn = useAppSelector(visualTurnSelector);

    const dispatch = useAppDispatch();

    let townTxt = "";
    let turnTxt = "";

    if (screen === GameScreen.Trade) {
        townTxt = town;
        turnTxt = `Turn: ${turn.turn} / ${turn.maxTurns}`;
    }

    return (
        <div className={styles.header}>
            <div
                className={styles.menuTrigger}
                onClick={() => dispatch(showMenu(true))}
            >
                <BurgerMenuIcon />
            </div>
            <div className={styles.town}>{townTxt}</div>
            <div className={styles.turns}>{turnTxt}</div>
        </div>
    );
}
