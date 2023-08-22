import classNames from "classnames";

import { fightSelector, wipeSelector } from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import ScoreBoard from "./Scoreboard";
import SeaBattle from "./SeaBattle";
import Trade from "./Trade";

import "./global.css";
import styles from "./App.module.css";

function App() {
    const wipe = useAppSelector(wipeSelector);
    const fight = useAppSelector(fightSelector);

    const gameOver = false; // TODO

    let wipeMessage = "";

    if (wipe.content.contentType === "WipeNextTurn") {
        wipeMessage = `Turn ${wipe.content.displayTurn}`;
    } else if (wipe.content.contentType === "WipeFinalTurn") {
        wipeMessage = "Last Turn";
    } else if (wipe.content.contentType === "WipeGameOver") {
        wipeMessage = "Final Score";
    }

    let content = <Trade />;

    if (fight) {
        content = <SeaBattle {...fight} />;
    } else if (gameOver) {
        content = <ScoreBoard />;
    }

    return (
        <div className={styles.mainWrap}>
            <div className={styles.gameScreen}>
                <div className={styles.header}></div>
                <div className={styles.body}>{content}</div>
                <div
                    className={classNames([
                        styles.turnWipe,
                        { [styles.wipe]: wipe.showing },
                    ])}
                >
                    {wipeMessage}
                </div>
            </div>
        </div>
    );
}

export default App;
