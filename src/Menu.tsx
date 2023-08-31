import React, { useRef } from "react";
import cn from "classnames";

import { menuSelector, menuTriggered } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { MenuStatus } from "./app/types";
import useClickOutside from "./useOutsideClick";

import styles from "./Menu.module.css";

export default function Menu() {
    const menu = useAppSelector(menuSelector);
    const dispatch = useAppDispatch();

    const ref = useRef(null);

    useClickOutside(ref, () => {
        if (menu === MenuStatus.Open) {
            dispatch(menuTriggered(MenuStatus.Close));
        }
    });

    // TODO overlay

    return (
        <>
            {/* <div
                className={cn(styles.overlay, {
                    [styles.fadeIn]: menu === MenuStatus.Open,
                    [styles.fadeOut]: menu === MenuStatus.Close,
                })}
            /> */}
            <div
                ref={ref}
                className={cn(styles.menu, {
                    [styles.slideIn]: menu === MenuStatus.Open,
                    [styles.slideOut]: menu === MenuStatus.Close,
                })}
            >
                <div className={styles.content}>
                    <div className={styles.menuItem}>Scoreboard</div>
                    <div className={styles.menuItem}>New Game</div>
                </div>
                <div
                    className={styles.closeBtn}
                    onClick={() => dispatch(menuTriggered(MenuStatus.Close))}
                >
                    ✕
                </div>
            </div>
        </>
    );
}
