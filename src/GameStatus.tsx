import { RootState } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { holdTotalSelector } from "./app/selectors";
import { MAX_TURNS } from "./app/initialState";
import Cash from "./Cash";

function GameStatus() {
    const cash = useAppSelector((state: RootState) => state.cash);
    const hold = useAppSelector(holdTotalSelector);
    const turnNumber = useAppSelector((state: RootState) => state.turnNumber);

    return (
        <div>
            <div>
                Cash: <Cash amount={cash} />
            </div>
            <div>
                Hold: {hold.current} / {hold.max}
            </div>
            <div>
                Turn: {turnNumber} / {MAX_TURNS}
            </div>
        </div>
    );
}

export default GameStatus;
