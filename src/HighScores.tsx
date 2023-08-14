import React from "react";

import { useAppDispatch } from "./app/hooks";

function HighScores() {
    const dispatch = useAppDispatch();

    return (
        <div>
            SCORE
            <div className="buttons">
                <button></button>
            </div>
        </div>
    );
}

export default HighScores;
