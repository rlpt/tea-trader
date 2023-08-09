import React from "react";
import cn from "classnames";

import { FightInput, fightMoveClicked } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import { FightInProgress, FightOutcome } from "./app/types";
import Galleon, { Direction } from "./Galleon";
import Spacer from "./Spacer";

import styles from "./SeaBattle.module.css";

function SeaBattle(props: FightInProgress) {
    const dispatch = useAppDispatch();

    const messages = [...props.messages].reverse().map((message, index) => (
        <div
            className={cn({
                [styles.message]: true,
                [styles.topMessage]: index === 0,
            })}
            key={message.key}
        >
            {message.text}
        </div>
    ));

    let buttons = (
        <>
            <button
                onClick={() =>
                    dispatch(fightMoveClicked(FightInput.FightClicked))
                }
            >
                fight!
            </button>
            <button
                onClick={() =>
                    dispatch(fightMoveClicked(FightInput.RunClicked))
                }
            >
                run!
            </button>
        </>
    );

    if (props.outcome !== FightOutcome.StillStanding) {
        buttons = <button>Back to trading</button>;
    }

    if (props.outcome === FightOutcome.OpponentWins) {
        buttons = <button>See final score</button>;
    }

    return (
        <>
            <div className={styles.seaBattle}>
                <Galleon
                    face="🤨"
                    direction={Direction.FacingRight}
                    stats={props.player}
                />
                <div className={styles.rhs}>
                    <Galleon
                        face="😠"
                        direction={Direction.FacingLeft}
                        stats={props.opponent}
                    />
                </div>
            </div>
            <div className="buttons">{buttons}</div>
            <Spacer height="20px" />
            <div className={styles.messages}>{messages}</div>
        </>
    );
}

export default SeaBattle;
