import React, { useState } from "react";
import cn from "classnames";

import {
    endSpecialEvent,
    FightInput,
    fightMoveClicked,
    showFinalScore,
} from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import { FightInProgress, FightOutcome } from "./app/types";
import Button from "./Button";
import Galleon, { Direction } from "./Galleon";
import ScreenTitle from "./ScreenTitle";
import Spacer from "./Spacer";

import styles from "./SeaBattle.module.css";

function SeaBattle(props: FightInProgress) {
    const dispatch = useAppDispatch();

    const [hit, setHit] = useState(false);

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
                Fight!
            </Button>
            <Button
                onClick={() =>
                    dispatch(fightMoveClicked(FightInput.RunClicked))
                }
            >
                Run!
            </Button>
        </>
    );

    if (props.outcome !== FightOutcome.StillStanding) {
        buttons = (
            <Button onClick={() => dispatch(endSpecialEvent())} secondary>
                Back to trading
            </Button>
        );
    }

    if (props.outcome === FightOutcome.OpponentWins) {
        buttons = (
            <Button onClick={() => dispatch(showFinalScore())}>
                Final score
            </Button>
        );
    }

    return (
        <>
            <ScreenTitle>Pirate Attack!</ScreenTitle>
            <div className={styles.seaBattle}>
                <div
                    onClick={() => {
                        setHit(true);
                        setTimeout(() => {
                            setHit(false);
                        }, 2000);
                    }}
                    className={cn({ run: hit })}
                >
                    <Galleon
                        face="🤨"
                        direction={Direction.FacingRight}
                        stats={props.player}
                        name={props.player.name}
                    />
                </div>
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
            {/* TODO remove */}
            <Spacer height="20px" />
            <div className={styles.messages}>
                {messages}

                <div className={styles.bottomGradient} />
            </div>
        </>
    );
}

export default SeaBattle;
