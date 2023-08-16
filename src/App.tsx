import classNames from "classnames";
import { omit } from "lodash";

import {
    fightSelector,
    gameOverSelector, // TODO game over selector test
    wipeSelector,
} from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import GameHeader from "./GameHeader";
import GameStatus from "./GameStatus";
import PriceMessages from "./PriceMessages";
import ScoreBoard from "./Scoreboard";
import SeaBattle from "./SeaBattle";
import SpecialEventModal from "./SpecialEventModal";
import TeaTable from "./TeaTable";
import Trade from "./Trade";

import "./global.css";
import styles from "./App.module.css";

function App() {
    const wipe = useAppSelector(wipeSelector);
    const fight = useAppSelector(fightSelector);
    const gameOver = useAppSelector(gameOverSelector);

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
        <div>
            <div className={styles.header}></div>
            <div className={styles.body}>{content}</div>
        </div>
    );
}

export default App;
