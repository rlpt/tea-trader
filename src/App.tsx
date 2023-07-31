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
            <div>
                Location: Liverpool <button>Visit Bank</button>
            </div>
            <TeaTable />
            <button onClick={() => dispatch(nextTurn())}>Next Turn</button>
        </div>
    );
}

export default App;
