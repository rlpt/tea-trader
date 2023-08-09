import React from "react";
import classNames from "classnames";

import { showChangeLocationModal, showEndGameModal } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { MAX_TURNS } from "./app/initialState";
import { turnNumberSelector, wipeSelector } from "./app/selectors";
import { GameState } from "./app/types";
import BuySellModal from "./BuySell";
import ChangeLocation from "./ChangeLocation";
import GameStatus from "./GameStatus";
import Modal from "./Modal";
import PriceMessages from "./PriceMessages";
import Spacer from "./Spacer";
import TeaTable from "./TeaTable";

import "./App.css";
import "./almond.css";

function App() {
    const dispatch = useAppDispatch();
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

    // TODO use named grid for layout, no need for spacers

    // TODO use vars for consistent spacing

    let content = (
        <>
            <GameStatus />
            <PriceMessages />
            <TeaTable />
            <div className="buttons">{button}</div>
            {modalEl}
            <div className={classNames(["turn-wipe", { wipe: wipe.showing }])}>
                {wipeMessage}
            </div>
        </>
    );

    // TODO show fight
    // content = (
    //     <>
    //         <Spacer height="40px" />
    //         <SeaBattle />
    //     </>
    // );

    return (
        <div id="main-wrapper">
            <div className="game-header">
                <div className="town-name">London</div>
                <div className="turn-count">
                    Turn: {currentTurn} / {MAX_TURNS}
                </div>
            </div>
            <div className="game-body">{content}</div>
        </div>
    );
}

export default App;
