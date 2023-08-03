import { RootState } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { cargoTotalSelector } from "./app/selectors";
import { MAX_TURNS } from "./app/initialState";
import Cash from "./Cash";
import "./GameStatus.css";

function GameStatus() {
    const cash = useAppSelector((state: RootState) => state.cash);
    const cargo = useAppSelector(cargoTotalSelector);
    const turnNumber = useAppSelector((state: RootState) => state.turnNumber);

    return (
        <div className="game-status">
            <div>
                Cash: <Cash amount={cash} />
            </div>
            <div>
                Cargo: {cargo.current} / {cargo.max}
            </div>
            <div>
                Turn: {turnNumber} / {MAX_TURNS}
            </div>
        </div>
    );
}

export default GameStatus;
