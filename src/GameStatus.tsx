import { RootState } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { holdTotalSelector } from "./app/selectors";
import { MAX_TURNS } from "./app/initialState";
import Cash from "./Cash";
import "./GameStatus.css";

function GameStatus() {
    const cash = useAppSelector((state: RootState) => state.cash);
    const bank = useAppSelector((state: RootState) => state.bank);
    const hold = useAppSelector(holdTotalSelector);
    const turnNumber = useAppSelector((state: RootState) => state.turnNumber);

    return (
        <div className="game-status">
            <div>
                <div>
                    Cash: <Cash amount={cash} />
                </div>
                <div>
                    Bank: <Cash amount={bank} />
                </div>
            </div>
            <div>
                <div>
                    Hold: {hold.current} / {hold.max}
                </div>
                <div>
                    Turn: {turnNumber} / {MAX_TURNS}
                </div>
            </div>
        </div>
    );
}

export default GameStatus;
