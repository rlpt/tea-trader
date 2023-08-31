import React from "react";
import cn from "classnames";

import { menuSelector } from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import { MenuStatus } from "./app/types";

import styles from "./Menu.module.css";

export default function Menu() {
    const menu = useAppSelector(menuSelector);

    return (
        <div
            className={cn(styles.menu, {
                [styles.slideIn]: menu === MenuStatus.Open,
                [styles.slideOut]: menu === MenuStatus.Close,
            })}
        ></div>
    );
}
