import React from "react";
import cn from "classnames";

import {
    endSpecialEvent,
    FightInput,
    fightMoveClicked,
} from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import { FightInProgress, FightOutcome } from "./app/types";
import Button from "./Button";
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
            <Button
                onClick={() =>
                    dispatch(fightMoveClicked(FightInput.FightClicked))
                }
            >
                fight!
            </Button>
            <Button
                onClick={() =>
                    dispatch(fightMoveClicked(FightInput.RunClicked))
                }
            >
                run!
            </Button>
        </>
    );

    if (props.outcome !== FightOutcome.StillStanding) {
        buttons = (
            <button onClick={() => dispatch(endSpecialEvent())}>
                Back to trading
            </button>
        );
    }

    if (props.outcome === FightOutcome.OpponentWins) {
        buttons = <button>See final score</button>;
    }

    return (
        <>
            <h3 className={styles.screenTitle}>Pirate Attack!</h3>
            <div className={styles.seaBattle}>
                <Galleon
                    face="🤨"
                    direction={Direction.FacingRight}
                    stats={props.player}
                    name={props.player.name}
                />
                <div className={styles.rhs}>
                    <Galleon
                        face="😠"
                        direction={Direction.FacingLeft}
                        stats={props.opponent}
                        name={"🏴‍☠️ " + props.opponent.name}
                    />
                </div>
            </div>
            <div className="buttons">{buttons}</div>
            <Spacer height="20px" />
            <div className={styles.messages}>
                {messages}

                <div className={styles.bottomGradient} />
            </div>
        </>
    );
}

export default SeaBattle;
