import { cargoTotalSelector, playerSelector } from "./app/gameReducer";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import AmountBar from "./AmountBar";
import Cash from "./Cash";
import FighterStats from "./FighterStats";

import styles from "./GameStatus.module.css";

// TODO max cash length

function GameStatus() {
    const cash = useAppSelector((state: RootState) => state.cash);
    const cargo = useAppSelector(cargoTotalSelector);
    const player = useAppSelector(playerSelector);

    return (
        <div className={styles.gameStatus}>
            <div className={styles.cash}>
                <Cash amount={cash} />
            </div>
            <div>
                <div className={styles.stats}>
                    <FighterStats
                        health={player.health}
                        strength={player.strength}
                        defense={player.defense}
                    />
                </div>
                <AmountBar
                    value={cargo.current}
                    max={cargo.max}
                    label="CARGO"
                    color="#4dfff3"
                />
            </div>
        </div>
    );
}

export default GameStatus;
