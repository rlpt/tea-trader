import { DAMAGE_VARIABLE } from "./initialState";
import { Npc } from "./types";

export type StillStanding = {
    fightResult: "StillStanding";
    health: number;
    npc: Npc;
    playerDamage: number;
    npcDamage: number;
};

export type PlayerWins = {
    fightResult: "PlayerWins";
    health: number;
    playerDamage: number;
    npcDamage: number;
};

export type PlayerDead = {
    fightResult: "PlayerDead";
    playerDamage: number;
    npcDamage: number;
};

type Fighter = {
    health: number;
    strength: number;
    defense: number;
};

export function fight(
    attacker: Fighter,
    opponent: Fighter,
    rng1: number,
    rng2: number,
) {
    console.log("FIGHT");

    return "";
}

function damageDelt(
    attackerStrength: number,
    opponentDefense: number,
    rng1: number,
    rng2: number,
): number {
    const amplifier = Math.ceil(rng1 * DAMAGE_VARIABLE);

    const landed = amplifier + attackerStrength > opponentDefense;
    // amplified gives attacker a change to hit regardless of opponentDefense
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
