import React, { PropsWithChildren } from "react";

import styles from "./ActionButtons.module.css";

function ActionButtons(props: PropsWithChildren) {
    return <div className={styles.actionButtons}>{props.children}</div>;
}

export default ActionButtons;
