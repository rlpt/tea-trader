import React from "react";

import { buyArmor, endSpecialEvent } from "./app/gameReducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    CARGO_INCREASE_COST,
    DEFENSE_INCREASE_COST,
    DEFENSE_INCREASE_VALUE,
    HEAL_EVENT_INCREASE,
    STRENGTH_INCREASE_COST,
} from "./app/initialState";
import { specialEventSelector } from "./app/selectors";
import { SpecialEvent } from "./app/types";
import { DEFENSE_ICON, HEALTH_ICON, STRENGTH_ICON } from "./icons";
import Modal from "./Modal";

import styles from "./SpecialEventModal.module.css";

function SpecialEventModal() {
    const dispatch = useAppDispatch();
    const specialEvent = useAppSelector(specialEventSelector);

    let message = "";
    let icon = "";
    let buttons = <></>;

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
        buttons = <button>Buy</button>;
    } else if (specialEvent.eventType === "AutoHealEvent") {
        icon = HEALTH_ICON;
        message = `You regenerated ${HEAL_EVENT_INCREASE} health!`;
        buttons = <button>Thanks!</button>;
    } else if (specialEvent.eventType === "WeaponEvent") {
        icon = STRENGTH_ICON;
        message = `Would you like buy a bigger cannon for £${STRENGTH_INCREASE_COST.toLocaleString()}?`;
        buttons = <button>Buy</button>;
    } else if (specialEvent.eventType === "TreasureEvent") {
        // TODO
    }

    if (specialEvent.eventType !== "NoEvent") {
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
