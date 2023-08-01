import React, { useState } from "react";
import { ALL_TOWN_NAMES } from "./app/initialState";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { townSelector } from "./app/selectors";
import "./ChangeLocation.css";
import { nextTurn } from "./app/gameReducer";
import { Town } from "./app/types";

function ChangeLocationModal() {
    const dispatch = useAppDispatch();

    const [nextTown, setNextTown] = useState<keyof typeof Town>();

    let currentTown = useAppSelector(townSelector);

    const townList = ALL_TOWN_NAMES.filter((town) => town !== currentTown).map(
        (town) => (
            <div key={town} className="town-list">
                <label>
                    <input
                        type="radio"
                        value={town}
                        name="towns"
                        onClick={() => setNextTown(town)}
                    />
                    {town}
                </label>
            </div>
        ),
    );

    return (
        <div className="change-location">
            {townList}

            <div className="buttons">
                <button
                    disabled={!nextTown}
                    onClick={() => {
                        if (nextTown) {
                            dispatch(nextTurn({ nextTown: Town[nextTown] }));
                        }
                    }}
                >
                    Change Location
                </button>
            </div>
        </div>
    );
}

export default ChangeLocationModal;
