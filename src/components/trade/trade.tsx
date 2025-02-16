import { useEffect, useState } from "react";

import {
    closeModal,
    modalSelector,
    showChangeLocationModal,
    showFinalScore,
} from "../../app/game-reducer";
import { isLastTurnSelector } from "../../app/game-reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../button/button";
import BuySell from "../buy-sell/buy-sell";
import ChangeLocation from "../change-location/change-location";
import Debug from "../debug/debug";
import GameStatus from "../game-status/game-status";
import Modal from "../modal-message/modal";
import PriceMessages from "../price-messages/price-messages";
import SpecialEventModal from "../special-event-modal/special-event-modal";
import TeaTable from "../tea-table/tea-table";

import styles from "./trade.module.css";

// TODO organise components by screen

function Trade() {
    const dispatch = useAppDispatch();
    const modal = useAppSelector(modalSelector);
    const isLastTurn = useAppSelector(isLastTurnSelector);

    const [showDebug, setShowDebug] = useState(false);

    useEffect(() => {
        (window as any).showDebug = (show: boolean) => {
            setShowDebug(show);
        };
    }, []);

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
            </div>
            {modalEl}
            <SpecialEventModal />
        </div>
    );
}

export default Trade;
