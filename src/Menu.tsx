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

    return (
        <>
            <div
                className={cn(styles.menu, {
                    [styles.slideIn]: menu === MenuStatus.Open,
                    [styles.slideOut]: menu === MenuStatus.Close,
                })}
            />
            <div
                ref={ref}
                className={cn(styles.menu, {
                    [styles.slideIn]: menu === MenuStatus.Open,
                    [styles.slideOut]: menu === MenuStatus.Close,
                })}
            ></div>
        </>
    );
}
