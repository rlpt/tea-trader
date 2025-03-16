import React, { useEffect, useState } from "react";

import { marketEventsFlavourText } from "../../game-logic/flavour-text";
import { closeModal } from "../../game-logic/game-reducer";
import { useAppDispatch } from "../../game-logic/hooks";
import { PriceEvent } from "../../game-logic/types";

export const ModalTeaEvent = ({
    tea,
    event,
}: {
    tea: string;
    event: PriceEvent;
}) => {
    const dispatch = useAppDispatch();
    const [msg, setMsg] = useState("");

    useEffect(() => {
        // Get all matching market events flavour text for this price movement
        const matchingEvents = marketEventsFlavourText.filter(
            (flavourText) => flavourText.impact === event,
        );

        // Pick a random text
        const randomEvent =
            matchingEvents[Math.floor(Math.random() * matchingEvents.length)];

        setMsg(randomEvent.text);
    }, [tea, event]);

    const parts = msg.split("[TEA]");

    return (
        <>
            <div>
                {parts[0]}
                <span style={{ fontWeight: "bold" }}>{tea}</span>
                {parts[1]}
            </div>
            <div className="buttons">
                <button onClick={() => dispatch(closeModal())}>Ok!</button>
            </div>
        </>
    );
};
