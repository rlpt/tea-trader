import React from "react";

import { newGame } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";

function HighScores() {
    const dispatch = useAppDispatch();

    return (
        <div>
            <h2 className="screenTitle">Scoreboard</h2>
            <div className="buttons">
                <button onClick={() => dispatch(newGame())}>New Game</button>
            </div>
        </div>
    );
}

export default HighScores;
