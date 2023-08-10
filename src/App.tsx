import classNames from "classnames";

import { useAppSelector } from "./app/hooks";
import { MAX_TURNS } from "./app/initialState";
import {
    fightSelector,
    turnNumberSelector,
    wipeSelector,
} from "./app/selectors";
import SeaBattle from "./SeaBattle";
import Trade from "./Trade";

import "./App.css";
import "./almond.css";

function App() {
    const currentTurn = useAppSelector(turnNumberSelector);
    const wipe = useAppSelector(wipeSelector);
    const fight = useAppSelector(fightSelector);

    let wipeMessage = "";

    if (wipe.content.contentType === "NextTurn") {
        wipeMessage = `Turn ${wipe.content.displayTurn}`;
    }

    let content = <Trade />;

    if (fight) {
        content = <SeaBattle {...fight} />;
    }

    return (
        <div id="main-wrapper">
            <div className="game-header">
                <div className="town-name">London</div>
                <div className="turn-count">
                    Turn: {currentTurn} / {MAX_TURNS}
                </div>
            </div>
            <div className="game-body">{content}</div>
            <div className={classNames(["turn-wipe", { wipe: wipe.showing }])}>
                {wipeMessage}
            </div>
        </div>
    );
}

export default App;
