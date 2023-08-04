import { RootState } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { cargoTotalSelector, townSelector } from "./app/selectors";
import { MAX_TURNS } from "./app/initialState";
import Cash from "./Cash";
import "./GameStatus.css";

function GameStatus() {
    const cash = useAppSelector((state: RootState) => state.cash);
    const cargo = useAppSelector(cargoTotalSelector);
    const turnNumber = useAppSelector((state: RootState) => state.turnNumber);
    const town = useAppSelector(townSelector);

    // TODO tidy this up, styling is a bit meh

    return (
        <div className="game-status">
            <div>
                <div className="cash">
                    <Cash amount={cash} />
                </div>
            </div>
            <div className="right">
                <div className="right-item">
                    <div className="right-label">Cargo:</div>
                    <div className="right-content">
                        {cargo.current} / {cargo.max}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameStatus;
