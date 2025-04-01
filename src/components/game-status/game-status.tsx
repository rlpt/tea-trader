import {
    cargoTotalSelector,
    financeSelector,
    playerSelector,
} from "../../game-logic/game-reducer";
import { useAppSelector } from "../../game-logic/hooks";
import AmountBar from "../amount-bar/amount-bar";
import Cash from "../cash/cash";
import FighterStats from "../fighter-stats/fighter-stats";

import styles from "./game-status.module.css";

function GameStatus() {
    const { cash, debt } = useAppSelector(financeSelector);
    const cargo = useAppSelector(cargoTotalSelector);
    const player = useAppSelector(playerSelector);

    return (
        <div className={styles.gameStatus}>
            <div>
                <div className={styles.cash}>
                    <Cash amount={cash} />
                </div>
                <div className={styles.debt}>
                    Debt: <Cash amount={debt} className={styles.debtAmount} />
                </div>
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
