import classNames from "classnames";

import Button from "./components/button/button";
import Header from "./components/header/header";
import MenuModal from "./components/menu-modal/menu-modal";
import ScoreBoard from "./components/scoreboard/scoreboard";
import SeaBattle from "./components/sea-battle/sea-battle";
import Start from "./components/start/start";
import Trade from "./components/trade/trade";
import {
    backToGame,
    fightSelector,
    modalSelector,
    restart,
    screenSelector,
    wipeSelector,
} from "./game-logic/game-reducer";
import { useAppDispatch, useAppSelector } from "./game-logic/hooks";
import { GameScreen } from "./game-logic/types";

import "./global.css";
import styles from "./app.module.css";

// TODO use style imports for all components

function App() {
    const wipe = useAppSelector(wipeSelector);
    const screen = useAppSelector(screenSelector);
    const fight = useAppSelector(fightSelector);
    const modal = useAppSelector(modalSelector);

    const dispatch = useAppDispatch();

    let wipeMessage = "";

    if (wipe.content.contentType === "TextWipe") {
        wipeMessage = wipe.content.text;
    }

    let content = <Start />;

    if (screen === GameScreen.Trade) {
        content = <Trade />;
    } else if (screen === GameScreen.GameOver) {
        content = (
            <ScoreBoard
                buttons={
                    <Button onClick={() => dispatch(restart())}>
                        New Game
                    </Button>
                }
            />
        );
    } else if (screen === GameScreen.Scoreboard) {
        content = (
            <ScoreBoard
                buttons={
                    <Button onClick={() => dispatch(backToGame())}>Back</Button>
                }
            />
        );
    }

    if (fight) {
        content = <SeaBattle {...fight} />;
    }

    let modalEl = <></>;

    if (modal.modalType === "MenuModal") {
        modalEl = <MenuModal />;
    }

    return (
        <div className={styles.mainWrap}>
            <div className={styles.gameScreen}>
                <Header />
                <div className={styles.body}>{content}</div>
                {modalEl}
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
