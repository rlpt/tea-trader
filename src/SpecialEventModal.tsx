import React from "react";

import {
    buyArmor,
    buyCargoSpace,
    buyWeapon,
    endSpecialEvent,
} from "./app/gameReducer";
import { specialEventSelector } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    CARGO_INCREASE_COST,
    CARGO_INCREASE_VALUE,
    DEFENSE_INCREASE_COST,
    DEFENSE_INCREASE_VALUE,
    HEAL_EVENT_INCREASE,
    STRENGTH_INCREASE_COST,
    STRENGTH_INCREASE_VALUE,
} from "./app/initialState";
import { DEFENSE_ICON, HEALTH_ICON, STRENGTH_ICON } from "./icons";
import Modal from "./Modal";

import styles from "./SpecialEventModal.module.css";

function SpecialEventModal() {
    const dispatch = useAppDispatch();
    const specialEvent = useAppSelector(specialEventSelector);

    let message = "";
    let icon = "";
    let buttons = <></>;

    const cancelButton = (
        <button
            className="cancel"
            onClick={() => {
                dispatch(endSpecialEvent());
            }}
        >
            Cancel
        </button>
    );

    if (specialEvent.eventType === "ArmorEvent") {
        icon = DEFENSE_ICON;
        message = `Would you like to buy some armour for £${DEFENSE_INCREASE_COST.toLocaleString()}?`;
        buttons = (
            <button
                onClick={() => {
                    dispatch(
                        buyArmor({
                            cost: DEFENSE_INCREASE_COST,
                            value: DEFENSE_INCREASE_VALUE,
                        }),
                    );

                    dispatch(endSpecialEvent());
                }}
            >
                Buy
            </button>
        );
    } else if (specialEvent.eventType === "CargoEvent") {
        icon = "🌟";
        message = `Would you like to increase cargo size for £${CARGO_INCREASE_COST.toLocaleString()}?`;
        buttons = (
            <>
                <button
                    type="submit"
                    onClick={() => {
                        dispatch(
                            buyCargoSpace({
                                cost: CARGO_INCREASE_COST,
                                value: CARGO_INCREASE_VALUE,
                            }),
                        );

                        dispatch(endSpecialEvent());
                    }}
                >
                    Buy
                </button>
                {cancelButton}
            </>
        );
    } else if (specialEvent.eventType === "HealEvent") {
        icon = HEALTH_ICON;
        message = `You regenerated ${HEAL_EVENT_INCREASE} health!`;
        buttons = (
            <button
                onClick={() => {
                    dispatch(endSpecialEvent());
                }}
            >
                Thanks!
            </button>
        );
    } else if (specialEvent.eventType === "WeaponEvent") {
        icon = STRENGTH_ICON;
        message = `Would you like buy a bigger cannon for £${STRENGTH_INCREASE_COST.toLocaleString()}?`;
        buttons = (
            <>
                <button
                    type="submit"
                    onClick={() => {
                        dispatch(
                            buyWeapon({
                                cost: STRENGTH_INCREASE_COST,
                                value: STRENGTH_INCREASE_VALUE,
                            }),
                        );

                        dispatch(endSpecialEvent());
                    }}
                >
                    Buy
                </button>
                {cancelButton}
            </>
        );
    }

    if (message) {
        return (
            <Modal onClose={() => endSpecialEvent()}>
                <div className={styles.icon}>{icon}</div>
                <p>{message}</p>
                <div className="buttons">{buttons}</div>
            </Modal>
        );
    }

    return <></>;
}

export default SpecialEventModal;
