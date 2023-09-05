import React, { PropsWithChildren } from "react";

import styles from "./ScreenTitle.module.css";

// TODO reuse on fight and scoreboard

export default function ScreenTitle(props: PropsWithChildren) {
    return <h3 className={styles.screenTitle}>{props.children}</h3>;
}
