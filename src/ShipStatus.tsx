import { RootState } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { holdTotalSelector } from "./app/selectors";

function ShipStatus() {
    const cash = useAppSelector((state: RootState) => state.cash);
    const hold = useAppSelector(holdTotalSelector);

    return (
        <div>
            <div>Cash: £{cash}</div>
            <div>
                Hold: {hold.current} / {hold.max}
            </div>
        </div>
    );
}

export default ShipStatus;
