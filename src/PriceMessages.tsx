import React, { useEffect } from "react";
import cn from "classnames";

import { useAppSelector } from "./app/hooks";
import { priceMessagesSelector } from "./app/selectors";

import styles from "./PriceMessages.module.css";

const messageIcon = "💬";

function PriceMessages() {
    const priceMessages = useAppSelector(priceMessagesSelector);

    const msgCount = priceMessages.length;

    const [msgIdx, setMsgIdx] = React.useState(0);
    const [moving, setMoving] = React.useState(false);

    useEffect(() => {
        const init = setTimeout(() => setMoving(true), 0);

        const timer = setTimeout(() => {
            setMsgIdx((idx) => idx + 1);
            setMoving(false);
        }, 2000);

        return () => {
            clearTimeout(init);
            clearTimeout(timer);
        };
    }, []);

    if (priceMessages.length === 0) {
        return <></>;
    }

    const renderMsg = (msg: string, extraClasses: string) => (
        <div className={cn([styles.msgWrapper, extraClasses])} key={msg}>
            <div className={styles.icon}>{messageIcon}</div>
            <div className={styles.message}>{msg}</div>
        </div>
    );

    if (priceMessages.length === 1) {
        // single message needs no animation
        return renderMsg(priceMessages[0], "");
    }

    // animated messages
    const currentMsg = renderMsg(
        priceMessages[msgIdx % msgCount],
        cn([styles.currentMsg, { [styles.scrollDown]: moving }]),
    );

    const nextMsg = renderMsg(
        priceMessages[(msgIdx + 1) % msgCount],
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
