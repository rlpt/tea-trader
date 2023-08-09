import React, { useEffect } from "react";
import cn from "classnames";

import { useAppSelector } from "./app/hooks";
import { priceMessagesSelector } from "./app/selectors";

import styles from "./PriceMessages.module.css";

const messageIcon = "💬";

function PriceMessages() {
    const priceMessages = useAppSelector(priceMessagesSelector);

    const [msgIdx, setMsgIdx] = React.useState(0);
    const [moving, setMoving] = React.useState(false);

    const msgCount = priceMessages.length;

    useEffect(() => {
        let moveTimeout: any;

        const animationLoop = setInterval(() => {
            // move both messages down 100%, this brings next message into view and
            // hides current message
            setMoving(true);

            moveTimeout = setTimeout(() => {
                // next message is in the old position of current message, so now stop the
                // animation and make old next message the current
                setMsgIdx((idx) => idx + 1);
                setMoving(false);
            }, 1500);
        }, 3000);

        return () => {
            clearTimeout(moveTimeout);
            clearInterval(animationLoop);
        };
    }, []);

    const renderMsg = (msg: string, extraClasses: string) => (
        // extra wrapping div is to make sure each message is on own line
        <div>
            <div className={cn([styles.msgWrapper, extraClasses])} key={msg}>
                <div className={styles.icon}>{messageIcon}</div>
                <div className={styles.message}>{msg}</div>
            </div>
        </div>
    );

    if (priceMessages.length === 0) {
        return <></>;
    }

    if (priceMessages.length === 1) {
        // single message needs no animation
        return renderMsg(priceMessages[0], "");
    }

    const currentIdx = msgIdx % msgCount;
    const nextIdx = (msgIdx + 1) % msgCount;

    // animated messages
    const currentMsg = renderMsg(
        priceMessages[currentIdx],
        cn([styles.currentMsg, { [styles.scrollDown]: moving }]),
    );

    // next message is rendered above current message hidden using overflow: hidden
    // on wrapper
    const nextMsg = renderMsg(
        priceMessages[nextIdx],
        cn([styles.nextMsg, { [styles.scrollDown]: moving }]),
    );

    return (
        <div className={styles.wrapper}>
            {nextMsg}
            {currentMsg}
        </div>
    );
}

export default PriceMessages;
