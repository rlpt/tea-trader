import React, { useState } from "react";
import classNames from "classnames";

import { nextTurn } from "../../app/game-reducer";
import { townSelector } from "../../app/game-reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ALL_TOWN_NAMES } from "../../app/initial-state";
import { Town } from "../../app/types";
import Button from "../button/button";

import "./change-location.css";

function ChangeLocationModal() {
    const dispatch = useAppDispatch();

    let currentTown = useAppSelector(townSelector);

    const [nextTown, setNextTown] = useState(currentTown);

    const townList = ALL_TOWN_NAMES.map((town) => {
        const disabled = town === currentTown;

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
