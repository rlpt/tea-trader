import React, { useEffect, useState } from "react";
import cn from "classnames";
import * as R from "remeda";

import {
    endSpecialEvent,
    FightInput,
    fightMoveClicked,
    showFinalScore,
} from "./app/game-reducer";
import { useAppDispatch } from "./app/hooks";
import { FightInProgress, FightOutcome } from "./app/types";
import Button from "./button";
import Galleon from "./galleon";
import ScreenTitle from "./screen-title";
import Spacer from "./spacer";

import styles from "./sea-battle.module.css";

function SeaBattle(props: FightInProgress) {
    const dispatch = useAppDispatch();

    const [animate, setAnimate] = useState({
        playerRan: false,
        playerHit: false,
        opponentHit: false,
    });

    // TODO share animation timings between css/ts

    useEffect(() => {
        const lastMessage = R.last(props.messages);

        let playerHitTimeout: ReturnType<typeof setTimeout>;
        let playerDelayTimeout: ReturnType<typeof setTimeout>;
        let opponentHitTimeout: ReturnType<typeof setTimeout>;

        const clearAllTimeouts = () => {
            clearTimeout(playerHitTimeout);
            clearTimeout(playerDelayTimeout);
            clearTimeout(opponentHitTimeout);
        };

        if (lastMessage) {
            if (lastMessage.log.includes("PlayerRan")) {
                setAnimate((state) => ({
                    ...state,
                    playerRan: true,
                }));

                return clearAllTimeouts;
            }

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

            return clearAllTimeouts;
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

    const disableActionButtons =
        animate.opponentHit === true || animate.playerHit === true;

    let buttons = (
        <>
            <Button
                disabled={disableActionButtons}
                onClick={() =>
                    dispatch(fightMoveClicked(FightInput.FightClicked))
                }
            >
                Fight!
            </Button>
            <Button
                disabled={disableActionButtons}
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
                <Galleon
                    face="🤨"
                    stats={props.player}
                    name={props.player.name}
                    animationClasses={cn({
                        shake: animate.playerHit,
                        run: animate.playerRan,
                    })}
                />
                <div className={styles.rhs}>
                    <Galleon
                        face="😠"
                        facingLeft
                        stats={props.opponent}
                        name={"🏴‍☠️ " + props.opponent.name}
                        animationClasses={cn(styles.rhs, {
                            shake: animate.opponentHit,
                        })}
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
