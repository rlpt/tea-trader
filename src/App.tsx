import React from "react";
import "the-new-css-reset/css/reset.css";
import TeaTable from "./TeaTable";
import "./App.css";
import GameStatus from "./GameStatus";
import { useAppDispatch } from "./app/hooks";
import { nextTurn } from "./app/gameReducer";
import Modal from "./Modal";

function App() {
    const dispatch = useAppDispatch();

    return (
        <div id="main-wrapper">
            <GameStatus />
            <hr />
            <div>
                Location: Liverpool <button>Visit Bank</button>
            </div>
            <hr />
            <TeaTable />
            <hr />
            <button onClick={() => dispatch(nextTurn())}>Next Turn</button>
        </div>
    );
}

export default App;
