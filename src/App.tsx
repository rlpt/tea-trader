import React from "react";
import TeaTable from "./TeaTable";
import "./App.css";
import GameStatus from "./GameStatus";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { showChangeLocationModal } from "./app/gameReducer";
import Modal from "./Modal";
import "almond.css";
import { townSelector } from "./app/selectors";
import { ActiveModal, GameState } from "./app/types";
import ChangeLocation from "./ChangeLocation";
import BuySellModal from "./BuySell";

function App() {
    const dispatch = useAppDispatch();
    const town = useAppSelector(townSelector);

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

    return (
        <div id="main-wrapper">
            <GameStatus />
            <h3 className="current-location">{town}</h3>
            <TeaTable />
            <div className="actions">
                <button onClick={() => dispatch(showChangeLocationModal())}>
                    Change Location
                </button>
            </div>
            {modalEl}
        </div>
    );
}

export default App;
