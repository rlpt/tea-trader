import { useState } from "react";

import {
    closeModal,
    modalSelector,
    showChangeLocationModal,
    showFinalScore,
} from "./app/gameReducer";
import { isLastTurnSelector } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Button from "./Button";
import BuySell from "./BuySell";
import ChangeLocation from "./ChangeLocation";
import Debug from "./Debug";
import GameStatus from "./GameStatus";
import Modal from "./Modal";
import PriceMessages from "./PriceMessages";
import SpecialEventModal from "./SpecialEventModal";
import TeaTable from "./TeaTable";

import styles from "./Trade.module.css";

// TODO organise components by screen

function Trade() {
    const dispatch = useAppDispatch();
    const modal = useAppSelector(modalSelector);
    const isLastTurn = useAppSelector(isLastTurnSelector);

    const [showDebug, setShowDebug] = useState(false);

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

    if (showDebug) {
        return <Debug onClose={() => setShowDebug(false)} />;
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
                <div className={styles.footer}>
                    <div
                        className={styles.debugBtn}
                        onClick={() => setShowDebug(true)}
                    >
                        debug
                    </div>
                </div>
            </div>
            {modalEl}
            <SpecialEventModal />
        </div>
    );
}

export default Trade;
