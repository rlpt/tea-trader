import React, { useState } from "react";
import classNames from "classnames";

import { animateNextTurn } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { ALL_TOWN_NAMES } from "./app/initialState";
import { townSelector } from "./app/selectors";
import { Town } from "./app/types";

import "./ChangeLocation.css";

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
                <button
                    disabled={nextTown === currentTown}
                    onClick={() => {
                        dispatch(animateNextTurn({ nextTown: Town[nextTown] }));
                    }}
                >
                    Change Location
                </button>
            </div>
        </div>
    );
}

export default ChangeLocationModal;
