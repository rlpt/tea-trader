import classNames from "classnames";

import {
    fightSelector,
    gameOverSelector,
    visualTurnSelector,
    wipeSelector,
} from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import GameHeader from "./GameHeader";
import ScoreBoard from "./Scoreboard";
import SeaBattle from "./SeaBattle";
import SpecialEventModal from "./SpecialEventModal";
import Trade from "./Trade";

import "./global.css";
import "./App.css";
import "./almond.css";

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
        <div id="main-wrapper">
            <GameHeader />
            <div className="game-body">
                {content}
                <SpecialEventModal />
            </div>
            <div className={classNames(["turn-wipe", { wipe: wipe.showing }])}>
                {wipeMessage}
            </div>
        </div>
    );
}

export default App;
