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
                <div className="top-item">
                    <span className="label">Cash:</span>
                    <Cash amount={cash} />
                </div>
                <div>
                    <span className="label">Turn:</span>
                    {turnNumber} / {MAX_TURNS}
                </div>
            </div>
            <div className="right">
                <div className="top-item right-item">
                    <div className="right-label">Cargo:</div>
                    <div className="right-content">
                        {cargo.current} / {cargo.max}
                    </div>
                </div>
                <div>
                    <div className="right-item">
                        <div className="right-label">Town: </div>
                        <div className="right-content">{town}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameStatus;
