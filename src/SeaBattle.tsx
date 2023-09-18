import React, { useEffect, useState } from "react";
import cn from "classnames";
import * as R from "remeda";

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

    const [animate, setAnimate] = useState({
        playerHit: false,
        opponentHit: false,
    });

    useEffect(() => {
        const lastMessage = R.last(props.messages);

        let playerHitTimeout: ReturnType<typeof setTimeout>;
        let playerDelayTimeout: ReturnType<typeof setTimeout>;
        let opponentHitTimeout: ReturnType<typeof setTimeout>;

        if (lastMessage) {
            console.log(lastMessage.log);

            // delay the hit animation on the player so the opponent gets hit animation first
            const playerDelay = 200;

            if (lastMessage.log.includes("OpponentHit")) {
                setAnimate((state) => ({
                    ...state,
                    opponentHit: true,
                }));

                playerHitTimeout = setTimeout(() => {
                    setAnimate((state) => ({
                        ...state,
                        opponentHit: false,
                    }));
                }, 500);
            }

            if (lastMessage.log.includes("PlayerHit")) {
                setTimeout(() => {
                    setAnimate((state) => ({
                        ...state,
                        playerHit: true,
                    }));
                }, playerDelay);

                playerHitTimeout = setTimeout(() => {
                    setAnimate((state) => ({
                        ...state,
                        playerHit: false,
                    }));
                }, 500 + playerDelay);
            }

            return () => {
                clearTimeout(playerHitTimeout);
                clearTimeout(playerDelayTimeout);
                clearTimeout(opponentHitTimeout);
            };
        }
    }, [props.messages, props.outcome]);

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

    // TODO sink animation

    return (
        <>
            <ScreenTitle>Pirate Attack!</ScreenTitle>
            <div className={styles.seaBattle}>
                <div className={cn({ shake: animate.playerHit })}>
                    <Galleon
                        face="🤨"
                        direction={Direction.FacingRight}
                        stats={props.player}
                        name={props.player.name}
                    />
                </div>
                <div className={cn(styles.rhs, { shake: animate.opponentHit })}>
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
