import classNames from "classnames";

import {
    fightSelector,
    modalSelector,
    screenSelector,
    showMenu,
    wipeSelector,
} from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { GameScreen } from "./app/types";
import Button from "./Button";
import Header from "./Header";
import MenuModal from "./MenuModal";
import Modal from "./Modal";
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

    if (wipe.content.contentType === "BlankWipe") {
        wipeMessage = "";
    } else if (wipe.content.contentType === "TextWipe") {
        wipeMessage = wipe.content.text;
    }

    let content = <Start />;

    if (screen === GameScreen.Trade) {
        content = <Trade />;
    } else if (screen === GameScreen.GameOver) {
        content = <ScoreBoard />;
    } else if (screen === GameScreen.Fight && fight) {
        content = <SeaBattle {...fight} />;
    }

    // TODO debug menu

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
