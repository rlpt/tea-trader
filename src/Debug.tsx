import React from "react";

import { debug } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import { DebugAction } from "./app/types";
import Button from "./Button";

import styles from "./Debug.module.css";

export default function Debug(props: { onClose: () => void }) {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.debug}>
            <div className={styles.closeBtn} onClick={props.onClose}>
                ✕
            </div>
            <div className={styles.item}>
                <Button
                    onClick={() =>
                        dispatch(debug(DebugAction.FightSmallPirate))
                    }
                >
                    Fight small pirate
                </Button>
            </div>
        </div>
    );
}
