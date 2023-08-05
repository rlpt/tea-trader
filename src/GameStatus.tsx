import { RootState } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { cargoTotalSelector } from "./app/selectors";
import Cash from "./Cash";
import "./GameStatus.css";
import AmountBar from "./AmountBar";

function GameStatus() {
    const cash = useAppSelector((state: RootState) => state.cash);
    const cargo = useAppSelector(cargoTotalSelector);

    return (
        <div className="game-status">
            <div className="cash">
                <Cash amount={cash} />
            </div>
            <div className="right">
                <div style={{ marginBottom: "2px" }}>
                    <AmountBar
                        value={100}
                        max={100}
                        label="HEALTH"
                        color="#04e824"
                    />
                </div>
                <AmountBar
                    value={cargo.current}
                    max={cargo.max}
                    label="CARGO"
                    color="#4dfff3"
                />
            </div>
        </div>
    );
}

export default GameStatus;
