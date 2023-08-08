import { DAMAGE_VARIABLE } from "./initialState";
import { Fighter, FightOutcome } from "./types";

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
};

export function fight(
    player: Fighter,
    opponent: Fighter,
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
    let playerHealth = player.health;

    // player hits first
    const opponentHealth = updateHealth(opponent.health, damageDealtByPlayer);

    if (opponentHealth === 0) {
        outcome = FightOutcome.PlayerWins;
    } else {
        // opponent still alive, so player takes hit
        playerHealth = updateHealth(player.health, damageDealtByNpc);
    }

    if (playerHealth === 0) {
        // he's dead jim
        outcome = FightOutcome.OpponentWins;
    }

    return {
        outcome,
        player: { health: playerHealth, damageTaken: damageDealtByNpc },
        opponent: {
            health: opponentHealth,
            damageTaken: damageDealtByPlayer,
        },
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
