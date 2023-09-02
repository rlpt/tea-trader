import React from "react";

import styles from "./Debug.module.css";

export default function Debug(props: { onClose: () => void }) {
    return (
        <div className={styles.debug}>
            <div className={styles.closeBtn} onClick={props.onClose}>
                ✕
            </div>
        </div>
    );
}
