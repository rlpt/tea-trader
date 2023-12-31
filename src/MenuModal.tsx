import React, { useState } from "react";

import { restart, showMenu, showScoreboard } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import Button from "./Button";
import Modal from "./Modal";

import styles from "./MenuModal.module.css";

export default function MenuModal() {
    const [confirm, setConfirm] = useState(false);

    const dispatch = useAppDispatch();

    let content = (
        <>
            <div className={styles.menuItem}>
                <Button onClick={() => setConfirm(true)}>New Game</Button>
            </div>
            <div className={styles.menuItem}>
                <Button
                    secondary
                    onClick={() => {
                        dispatch(showMenu(false));
                        dispatch(showScoreboard());
                    }}
                >
                    Scoreboard
                </Button>
            </div>
        </>
    );

    if (confirm) {
        content = (
            <>
                <p>You sure you want to start a new game?</p>
                <div className="buttons">
                    <Button onClick={() => dispatch(restart())}>Yes</Button>
                    <Button onClick={() => dispatch(showMenu(false))} secondary>
                        Cancel
                    </Button>
                </div>
            </>
        );
    }

    return <Modal onClose={() => dispatch(showMenu(false))}>{content}</Modal>;
}
