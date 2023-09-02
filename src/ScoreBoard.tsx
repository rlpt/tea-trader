import React from "react";
import cn from "classnames";
import * as R from "remeda";

import { restart, scoreboardSelector } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Button from "./Button";

import styles from "./Scoreboard.module.css";

function Scoreboard() {
    const dispatch = useAppDispatch();
    // show max 10 rows
    const scores = R.take(useAppSelector(scoreboardSelector), 10);

    const scoreRows = scores.map((scoreItem, index) => (
        <tr
            key={`${scoreItem.score}-${index}`}
            className={cn({ [styles.latest]: scoreItem.latest })}
        >
            <td>{index + 1}</td>
            <td>{scoreItem.score}</td>
        </tr>
    ));

    // TODO show names

    return (
        <div>
            <h2 className="screenTitle">Scoreboard</h2>

            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>{scoreRows}</tbody>
            </table>

            <div className="buttons">
                <Button onClick={() => dispatch(restart())}>New Game</Button>
            </div>
        </div>
    );
}

export default Scoreboard;
