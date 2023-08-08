import React from "react";

import { fightClicked } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fightSelector } from "./app/selectors";
import Galleon, { Direction } from "./Galleon";

import styles from "./SeaBattle.module.css";

function SeaBattle() {
    const dispatch = useAppDispatch();
    const fight = useAppSelector(fightSelector);

    return (
        <>
            <div className={styles.seaBattle}>
                <Galleon
                    face="🤨"
                    direction={Direction.FacingRight}
                    stats={fight.player}
                />
                <div className={styles.rhs}>
                    <Galleon
                        face="😠"
                        direction={Direction.FacingLeft}
                        stats={fight.opponent}
                    />
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
