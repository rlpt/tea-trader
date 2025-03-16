import {
    CARGO_INCREASE_COST,
    DEFENSE_INCREASE_COST,
    EXTRA_LARGE_PIRATE,
    LARGE_PIRATE,
    MEDIUM_PIRATE,
    PIRATE_SHIP_NAMES,
    SMALL_PIRATE,
    STARTING_CARGO_SIZE,
    STARTING_DEFENSE,
    STARTING_HEALTH,
    STARTING_STRENGTH,
    STRENGTH_INCREASE_COST,
} from "./initial-state";
import { randomInRange } from "./rng";
import { FightOutcome, GameState, SpecialEvent } from "./types";

export function getRandomEvent(
    state: GameState,
    rng1: number,
    rng2: number,
): SpecialEvent {
    const allEvents = [
        {
            event: { eventType: "ArmorEvent" },
            canHappen: armorEventCanHappen,
            chance: 6,
        },
        {
            event: { eventType: "WeaponEvent" },
            canHappen: weaponEventCanHappen,
            chance: 5,
        },
        {
            event: { eventType: "CargoEvent" },
            canHappen: cargoEventCanHappen,
            chance: 6,
        },
        {
            event: { eventType: "HealEvent" },
            canHappen: healEventCanHappen,
            chance: 5,
        },
        {
            event: getRandomPirateEvent(rng2),
            canHappen: () => true,
            chance: 20,
        },
    ];

    const validEvents = allEvents
        // remove events that can't happen due to player state
        .filter((event) => event.canHappen(state))

    const randomEvent =
        validEvents[randomInRange(0, validEvents.length - 1, rng1)];

    if (randomEvent) {
        return randomEvent.event as SpecialEvent;
    }

    return { eventType: "NoEvent" };
}

export function getRandomPirateEvent(rng: number): SpecialEvent {
    const pirateNameInx = randomInRange(0, PIRATE_SHIP_NAMES.length - 1, rng);
    const pirateName = PIRATE_SHIP_NAMES[pirateNameInx];

    const pirateEvents = [
        {
            eventType: "FightEvent" as const,
            opponent: { ...SMALL_PIRATE, name: pirateName },
            rngIndex: 0,
            outcome: FightOutcome.StillStanding,
            messages: [],
        },
        {
            eventType: "FightEvent" as const,
            opponent: { ...MEDIUM_PIRATE, name: pirateName },
            rngIndex: 0,
            outcome: FightOutcome.StillStanding,
            messages: [],
        },
        {
            eventType: "FightEvent" as const,
            opponent: { ...LARGE_PIRATE, name: pirateName },
            rngIndex: 0,
            outcome: FightOutcome.StillStanding,
            messages: [],
        },
        {
            eventType: "FightEvent" as const,
            opponent: { ...EXTRA_LARGE_PIRATE, name: pirateName },
            rngIndex: 0,
            outcome: FightOutcome.StillStanding,
            messages: [],
        },
    ];

    return pirateEvents[randomInRange(0, pirateEvents.length - 1, rng)];
}

function weaponEventCanHappen(state: GameState): boolean {
    return (
        state.cash >= STRENGTH_INCREASE_COST &&
        state.strength === STARTING_STRENGTH
    );
}

function cargoEventCanHappen(state: GameState): boolean {
    return (
        state.cash >= CARGO_INCREASE_COST &&
        state.cargo.maxSize === STARTING_CARGO_SIZE
    );
}

function armorEventCanHappen(state: GameState): boolean {
    return (
        state.cash >= DEFENSE_INCREASE_COST &&
        state.defense === STARTING_DEFENSE
    );
}

function healEventCanHappen(state: GameState): boolean {
    return state.health < STARTING_HEALTH;
}

export function getLevel(strength: number, defense: number) {
    let level = 1;

    if (strength > STARTING_STRENGTH) {
        level += 1;
    }

    if (defense > STARTING_DEFENSE) {
        level += 1;
    }

    return level;
}
