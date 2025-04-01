import { useEffect, useState } from "react";

import {
    closeModal,
    modalSelector,
    showBankModal,
    showChangeLocationModal,
    showFinalScore,
    townSelector,
} from "../../game-logic/game-reducer";
import { isLastTurnSelector } from "../../game-logic/game-reducer";
import { useAppDispatch, useAppSelector } from "../../game-logic/hooks";
import { townFeatures } from "../../game-logic/initial-state";
import { TownFeature } from "../../game-logic/types";
import { Bank } from "../bank/bank";
import Button from "../button/button";
import BuySell from "../buy-sell/buy-sell";
import ChangeLocation from "../change-location/change-location";
import Debug from "../debug/debug";
import GameStatus from "../game-status/game-status";
import Modal from "../modal-message/modal";
import { ModalTeaEvent } from "../modal-tea-event/modal-tea-event";
import SpecialEventModal from "../special-event-modal/special-event-modal";
import TeaTable from "../tea-table/tea-table";

import styles from "./trade.module.css";

// TODO organise components by screen

function Trade() {
    const dispatch = useAppDispatch();
    const modal = useAppSelector(modalSelector);
    const isLastTurn = useAppSelector(isLastTurnSelector);
    let currentTown = useAppSelector(townSelector);

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
    } else if (modal.modalType === "TeaEventModal") {
        modalEl = (
            <Modal onClose={() => closeModal()}>
                <ModalTeaEvent
                    tea={modal.event.teaName}
                    event={modal.event.event}
                />
            </Modal>
        );
    } else if (modal.modalType === "BankModal") {
        modalEl = (
            <Modal onClose={() => closeModal()}>
                <Bank/>
            </Modal>
        );
    }

    const townFeature = townFeatures[currentTown];

    let townFeatureEl = <></>;

    if (townFeature === TownFeature.Bank) {
        townFeatureEl = <Button secondary onClick={() => dispatch(showBankModal())}>Visit bank 🏦</Button>;
    }

    let buttons = (
        <div className={styles.buttonStack}>
            {townFeatureEl}
            <Button onClick={() => dispatch(showChangeLocationModal())}>
                Change town
            </Button>
        </div>
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
            <div className={styles.teaTableWrap}>
                <TeaTable />
            </div>
            {modalEl}
            <div className="buttons">{buttons}</div>
            <SpecialEventModal />
        </div>
    );
}

export default Trade;
