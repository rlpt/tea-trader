import React from "react";
import TeaTable from "./TeaTable";
import "./App.css";
import GameStatus from "./GameStatus";
import { useAppDispatch } from "./app/hooks";
import { nextTurn } from "./app/gameReducer";
import Modal from "./Modal";
import "almond.css";

function App() {
    const dispatch = useAppDispatch();

    return (
        <div id="main-wrapper">
            <GameStatus />
            <h3 className="current-location">Liverpool</h3>
            <TeaTable />
            <div className="actions">
                <button onClick={() => dispatch(nextTurn())}>
                    Change Location
                </button>
            </div>
        </div>
    );
}

export default App;
