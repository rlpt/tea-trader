import classNames from "classnames";

import {
    backToGame,
    fightSelector,
    modalSelector,
    restart,
    screenSelector,
    wipeSelector,
} from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { GameScreen } from "./app/types";
import Button from "./Button";
import Header from "./Header";
import MenuModal from "./MenuModal";
import ScoreBoard from "./Scoreboard";
import SeaBattle from "./SeaBattle";
import Start from "./Start";
import Trade from "./Trade";

import "./global.css";
import styles from "./App.module.css";

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
