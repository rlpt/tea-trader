import React, { PropsWithChildren } from "react";

import styles from "./ScreenTitle.module.css";

export default function ScreenTitle(props: PropsWithChildren) {
    return <h3 className={styles.screenTitle}>{props.children}</h3>;
}
