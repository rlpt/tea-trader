import { closeModal, showChangeLocationModal } from "./app/gameReducer";
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

    return (
        <div>
            <GameStatus />
            <PriceMessages />
            <TeaTable />
            <div className="buttons">
                <button onClick={() => dispatch(showChangeLocationModal())}>
                    Change Location
                </button>
            </div>
            {modalEl}
        </div>
    );
}

export default Trade;
