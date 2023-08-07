import React from "react";

import { fightClicked } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import Galleon, { Direction } from "./Galleon";

import styles from "./SeaBattle.module.css";

function SeaBattle() {
    const dispatch = useAppDispatch();

    return (
        <>
            <div className={styles.seaBattle}>
                <Galleon face="🤨" direction={Direction.FacingRight} />
                <div className={styles.rhs}>
                    <Galleon face="😠" direction={Direction.FacingLeft} />
                </div>
            </div>
            <div className="buttons">
                <button onClick={() => dispatch(fightClicked())}>fight!</button>
                <button>run!</button>
            </div>
        </>
    );
}

export default SeaBattle;
