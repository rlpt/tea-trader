import React from "react";

import { newGame } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";

function HighScores() {
    const dispatch = useAppDispatch();

    return (
        <div>
            SCORE
            <div className="buttons">
                <button
                    onClick={() =>
                        dispatch(newGame(new Date().getTime().toString()))
                    }
                >
                    New Game
                </button>
            </div>
        </div>
    );
}

export default HighScores;
