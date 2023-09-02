import {
    closeModal,
    modalSelector,
    showChangeLocationModal,
    showFinalScore,
} from "./app/gameReducer";
import { isLastTurnSelector } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { GameState } from "./app/types";
import Button from "./Button";
import BuySell from "./BuySell";
import ChangeLocation from "./ChangeLocation";
import GameStatus from "./GameStatus";
import Modal from "./Modal";
import PriceMessages from "./PriceMessages";
import TeaTable from "./TeaTable";

import styles from "./Trade.module.css";

function Trade() {
    const dispatch = useAppDispatch();
    const modal = useAppSelector(modalSelector);
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

    // TODO replace location with town

    let buttons = (
        <Button onClick={() => dispatch(showChangeLocationModal())}>
            Change town
        </Button>
    );

    if (isLastTurn) {
        buttons = (
            <Button onClick={() => dispatch(showFinalScore())}>
                Final score
            </Button>
        );
    }

    return (
        <div className={styles.trade}>
            <div className={styles.gameStatusWrap}>
                <GameStatus />
            </div>
            <PriceMessages />
            <div className="buttons">{buttons}</div>
            <div className={styles.teaTableWrap}>
                <TeaTable />
            </div>
            {modalEl}
        </div>
    );
}

export default Trade;
