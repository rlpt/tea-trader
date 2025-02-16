import React from "react";

import { debug } from "./app/game-reducer";
import { useAppDispatch } from "./app/hooks";
import { DebugAction } from "./app/types";
import Button from "./button";

import styles from "./debug.module.css";

export default function Debug(props: { onClose: () => void }) {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.debug}>
            <div className={styles.closeBtn} onClick={props.onClose}>
                ✕
            </div>
            <div className={styles.item}>
                <Button
                    onClick={() =>
                        dispatch(debug(DebugAction.FightSmallPirate))
                    }
                >
                    Fight small pirate
                </Button>
            </div>
            <div className={styles.item}>
                <Button
                    onClick={() =>
                        dispatch(debug(DebugAction.FightMediumPirate))
                    }
                >
                    Fight medium pirate
                </Button>
            </div>
            <div className={styles.item}>
                <Button
                    onClick={() =>
                        dispatch(debug(DebugAction.FightLargePirate))
                    }
                >
                    Fight large pirate
                </Button>
            </div>
            <div className={styles.item}>
                <Button
                    onClick={() =>
                        dispatch(debug(DebugAction.FightExtraLargePirate))
                    }
                >
                    Fight extra large pirate
                </Button>
            </div>
            <div className={styles.item}>
                <Button onClick={() => dispatch(debug(DebugAction.ArmorEvent))}>
                    Armour event
                </Button>
            </div>
            <div className={styles.item}>
                <Button
                    onClick={() => dispatch(debug(DebugAction.WeaponEvent))}
                >
                    Weapon event
                </Button>
            </div>
            <div className={styles.item}>
                <Button onClick={() => dispatch(debug(DebugAction.CargoEvent))}>
                    Cargo event
                </Button>
            </div>
            <div className={styles.item}>
                <Button onClick={() => dispatch(debug(DebugAction.HealEvent))}>
                    Heal event
                </Button>
            </div>
        </div>
    );
}
