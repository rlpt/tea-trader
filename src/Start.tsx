import React, { useEffect, useState } from "react";
import * as R from "remeda";

import { startGame } from "./app/gameReducer";
import { useAppDispatch } from "./app/hooks";
import { SHIP_NAMES } from "./app/initialState";
import Button from "./Button";
import galleonImg from "./galleon.svg";
import { RESET_ICON } from "./icons";

import styles from "./Start.module.css";

export default function Start() {
    const [randomNames, setRandomNames] = useState<string[]>([]);
    const [nameIdx, setNameIdx] = useState<number>(0);
    const [name, setName] = useState<string>("");

    const dispatch = useAppDispatch();

    useEffect(() => {
        // shuffle the list of names and set as state
        // by incrementing an index and using the modulus operation
        // we can cycle thru the names endlessly

        const shuffledNames = R.shuffle(SHIP_NAMES);

        setRandomNames(shuffledNames);

        setName(shuffledNames[0]);
    }, []);

    const onReset = () => {
        const nextIdx = nameIdx + 1;

        setName(randomNames[nextIdx % randomNames.length]);
        setNameIdx(nextIdx);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    // TODO name max length

    return (
        <div className={styles.start}>
            <div className={styles.logo}>TEA TRADER</div>
            <div className={styles.intro}>Buy Low. Sell High</div>
            <div className={styles.galleon}>
                <img src={galleonImg} alt="Galleon" />
            </div>
            <div className={styles.pickName}>
                <input type="text" value={name} onChange={onChange} />
                <div className={styles.reset} onClick={onReset}>
                    {RESET_ICON}
                </div>
            </div>
            <Button onClick={() => dispatch(startGame(name))}>Start</Button>
        </div>
    );
}
