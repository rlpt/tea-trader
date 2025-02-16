import { cargoTotalSelector, playerSelector } from "./app/game-reducer";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import AmountBar from "./amount-bar";
import Cash from "./cash";
import FighterStats from "./fighter-stats";

import styles from "./game-status.module.css";

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
