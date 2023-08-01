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

function App() {
    const dispatch = useAppDispatch();
    const town = useAppSelector(townSelector);

    const activeModal = useAppSelector((state: GameState) => state.modal);

    let modal;

    if (activeModal === ActiveModal.ChangeLocation) {
        modal = (
            <Modal>
                <ChangeLocation />
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
            {modal}
        </div>
    );
}

export default App;
