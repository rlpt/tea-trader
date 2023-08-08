import { DAMAGE_VARIABLE } from "./initialState";
import { randomInRange } from "./rng";
import { Fighter, FightOutcome, Npc } from "./types";

type FightResult = {
    outcome: FightOutcome;
    player: {
        health: number;
        damageTaken: number;
    };
    opponent: {
        health: number;
        damageTaken: number;
    };
    reward: number;
    message: string;
};

export function fight(
    player: Fighter,
    opponent: Npc,
    rng1: number,
    rng2: number,
    rng3: number,
    rng4: number,
): FightResult {
    const damageDealtByPlayer = damageDone(
        player.strength,
        opponent.defense,
        rng1,
        rng2,
    );

    const damageDealtByNpc = damageDone(
        opponent.strength,
        player.defense,
        rng3,
        rng4,
    );

    let outcome = FightOutcome.StillStanding;
    let reward = 0;
    let playerHealth = player.health;

    // player hits first
    const opponentHealth = updateHealth(opponent.health, damageDealtByPlayer);

    let message = `You hit for ${damageDealtByPlayer} and took ${damageDealtByNpc} damage`;

    if (opponentHealth === 0) {
        outcome = FightOutcome.PlayerWins;
        // reward using player hit rng number, bigger the hit, the bigger the reward
        reward = randomInRange(opponent.minReward, opponent.maxReward, rng1);

        message = `You killed ${
            opponent.name
        } and won £${reward.toLocaleString()}!`;
    } else {
        // opponent still alive, so player takes hit
        playerHealth = updateHealth(player.health, damageDealtByNpc);
    }

    if (playerHealth === 0) {
        // he's dead jim
        outcome = FightOutcome.OpponentWins;

        message = `You've been killed by ${opponent.name}!`;
    }

    return {
        outcome,
        player: { health: playerHealth, damageTaken: damageDealtByNpc },
        opponent: {
            health: opponentHealth,
            damageTaken: damageDealtByPlayer,
        },
        reward,
        message,
    };
}

function updateHealth(current: number, damage: number) {
    const updatedHealth = current - damage;

    if (updatedHealth < 0) {
        return 0;
    }

    return updatedHealth;
}

function damageDone(
    attackerStrength: number,
    opponentDefense: number,
    rng1: number,
    rng2: number,
): number {
    const amplifier = Math.ceil(rng1 * DAMAGE_VARIABLE);

    const landed = amplifier + attackerStrength > opponentDefense;
    // amplified gives attacker a change to hit regardless of opponents defense
    const amplified = amplifier === DAMAGE_VARIABLE;

    let damage = 0;

    if (landed || amplified) {
        const modifier = rng2 * 0.5;

        damage = Math.ceil(attackerStrength * modifier);
        damage -= opponentDefense;

        if (damage < 0) {
            damage = 1;
        }
    }

    return damage;
}
