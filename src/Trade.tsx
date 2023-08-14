import {
    closeModal,
    showChangeLocationModal,
    showFinalScore,
} from "./app/gameReducer";
import { isLastTurnSelector } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { GameState } from "./app/types";
import BuySell from "./BuySell";
import ChangeLocation from "./ChangeLocation";
import GameStatus from "./GameStatus";
import Modal from "./Modal";
import PriceMessages from "./PriceMessages";
import TeaTable from "./TeaTable";

function Trade() {
    const dispatch = useAppDispatch();

    const modal = useAppSelector((state: GameState) => state.modal);
    const isLastTurn = useAppSelector(isLastTurnSelector);

    let modalEl;

    if (modal.modalType === "ChangeLocationModal") {
        modalEl = (
            <Modal onClose={() => closeModal()}>
                <ChangeLocation />
            </Modal>
        );
    } else if (modal.modalType === "BuySellModal") {
        modalEl = (
            <Modal onClose={() => closeModal()}>
                <BuySell tea={modal.tea} />
            </Modal>
        );
    }

    // TODO use named grid for layout, no need for spacers
    // TODO use vars for consistent spacing

    let buttons = (
        <button onClick={() => dispatch(showChangeLocationModal())}>
            Change Location
        </button>
    );

    if (isLastTurn) {
        <button onClick={() => dispatch(showFinalScore())}>Final Score</button>;
    }

    return (
        <div>
            <GameStatus />
            <PriceMessages />
            <TeaTable />
            <div className="buttons">{buttons}</div>
            {modalEl}
        </div>
    );
}

export default Trade;
