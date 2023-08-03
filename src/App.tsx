import React from "react";
import TeaTable from "./TeaTable";
import "./App.css";
import GameStatus from "./GameStatus";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { showChangeLocationModal, showEndGameModal } from "./app/gameReducer";
import Modal from "./Modal";
import "./almond.css";
import {
    messageSelector,
    townSelector,
    turnNumberSelector,
    wipeSelector,
} from "./app/selectors";
import { GameState } from "./app/types";
import ChangeLocation from "./ChangeLocation";
import BuySellModal from "./BuySell";
import { MAX_TURNS } from "./app/initialState";
import classNames from "classnames";

function App() {
    const dispatch = useAppDispatch();
    const town = useAppSelector(townSelector);
    const message = useAppSelector(messageSelector);
    const currentTurn = useAppSelector(turnNumberSelector);
    const wipe = useAppSelector(wipeSelector);

    const modal = useAppSelector((state: GameState) => state.modal);

    let modalEl;

    if (modal.modalType === "ChangeLocationModal") {
        modalEl = (
            <Modal>
                <ChangeLocation />
            </Modal>
        );
    } else if (modal.modalType === "BuySellModal") {
        modalEl = (
            <Modal>
                <BuySellModal tea={modal.tea} />
            </Modal>
        );
    }

    let button = (
        <button onClick={() => dispatch(showChangeLocationModal())}>
            Change Location
        </button>
    );

    if (currentTurn === MAX_TURNS) {
        button = (
            <button onClick={() => dispatch(showEndGameModal)}>
                Finish Game
            </button>
        );
    }

    let wipeMessage = "";

    if (wipe.content.contentType === "NextTurn") {
        wipeMessage = `Turn ${wipe.content.displayTurn}`;
    }

    return (
        <div id="main-wrapper">
            <div className="game-title">tea trader</div>
            <GameStatus />
            <TeaTable />
            <div className="buttons">{button}</div>
            {modalEl}
            <div className={classNames(["turn-wipe", { wipe: wipe.showing }])}>
                {wipeMessage}
            </div>
        </div>
    );
}

export default App;
