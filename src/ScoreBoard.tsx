import React from "react";

import { newGame } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";

function ScoreBoard() {
    const dispatch = useAppDispatch();

    return (
        <div>
            <h2 className="screenTitle">Scoreboard</h2>

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Score</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            <div className="buttons">
                <button onClick={() => dispatch(newGame())}>New Game</button>
            </div>
        </div>
    );
}

export default ScoreBoard;
