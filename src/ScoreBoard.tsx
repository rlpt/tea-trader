import React from "react";
import cn from "classnames";
import * as R from "remeda";

import { scoreboardSelector } from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import ScreenTitle from "./ScreenTitle";

import styles from "./Scoreboard.module.css";

function Scoreboard(props: { buttons: React.ReactNode }) {
    // show max 10 rows
    const scores = R.take(useAppSelector(scoreboardSelector), 10);

    const scoreRows = scores.map((scoreItem, index) => (
        <tr
            key={`${scoreItem.score}-${index}`}
            className={cn({ [styles.latest]: scoreItem.latest })}
        >
            <td>{index + 1}</td>
            <td>{scoreItem.score.name}</td>
            <td>{scoreItem.score.score}</td>
        </tr>
    ));

    return (
        <div>
            <ScreenTitle>Scoreboard</ScreenTitle>
            <div className={styles.button}>{props.buttons}</div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>{scoreRows}</tbody>
            </table>
        </div>
    );
}

export default Scoreboard;
