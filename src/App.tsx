import React from "react";
import TeaTable from "./TeaTable";
import "./App.css";
import ShipStatus from "./ShipStatus";

function App() {
    return (
        <div>
            <ShipStatus />
            <hr />
            <TeaTable />
        </div>
    );
}

export default App;
