import React from "react";

import {
    menuSelector,
    menuTriggered,
    screenSelector,
    townSelector,
    visualTurnSelector,
} from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { GameScreen, MenuStatus } from "./app/types";
import BurgerMenuIcon from "./BugerMenuIcon";

import styles from "./Header.module.css";

export default function Header() {
    const town = useAppSelector(townSelector);
    const screen = useAppSelector(screenSelector);
    const turn = useAppSelector(visualTurnSelector);
    const menu = useAppSelector(menuSelector);

    const dispatch = useAppDispatch();

    let townTxt = "";
    let turnTxt = "";

    if (screen === GameScreen.Trade) {
        townTxt = town;
        turnTxt = `Turn: ${turn.turn} / ${turn.maxTurns}`;
    }

    const nextMenuState =
        menu === MenuStatus.Open ? MenuStatus.Close : MenuStatus.Open;

    return (
        <div className={styles.header}>
            <div
                className={styles.menuTrigger}
                onClick={() => dispatch(menuTriggered(nextMenuState))}
            >
                <BurgerMenuIcon />
            </div>
            <div className={styles.town}>{townTxt}</div>
            <div className={styles.turns}>{turnTxt}</div>
        </div>
    );
}
