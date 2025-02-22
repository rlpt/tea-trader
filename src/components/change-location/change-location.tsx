import React, { useState } from "react";
import classNames from "classnames";

import { nextTurn, somethingHappeningSelector } from "../../game-logic/game-reducer";
import { townSelector } from "../../game-logic/game-reducer";
import { useAppDispatch, useAppSelector } from "../../game-logic/hooks";
import { ALL_TOWN_NAMES } from "../../game-logic/initial-state";
import { Town } from "../../game-logic/types";
import Button from "../button/button";

import "./change-location.css";

function ChangeLocationModal() {
    const dispatch = useAppDispatch();

    let currentTown = useAppSelector(townSelector);
    const somethingHappeningNextTurn = useAppSelector(somethingHappeningSelector);

    const [nextTown, setNextTown] = useState(currentTown);

    const townList = ALL_TOWN_NAMES.map((town) => {
        const disabled = town === currentTown;

        const townNextTurn = somethingHappeningNextTurn.find(
            (item) => item.town === town
        );

        return (
            <div key={town} className="town-list">
                <label className={classNames({ disabled })}>
                    <input
                        type="radio"
                        value={town}
                        name="towns"
                        onClick={() => setNextTown(town)}
                        disabled={disabled}
                    />
                    {town}
                    {townNextTurn?.somethingHappening && (
                        <span className="something-happening">🚨</span>
                    )}
                </label>
            </div>
        );
    });

    return (
        <div className="change-location">
            {townList}

            <div className="buttons">
                <Button
                    disabled={nextTown === currentTown}
                    onClick={() => {
                        dispatch(nextTurn({ nextTown: Town[nextTown] }));
                    }}
                >
                    Set Sail
                </Button>
            </div>
        </div>
    );
}

export default ChangeLocationModal;
