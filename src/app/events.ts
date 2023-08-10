import { smallPirate } from "./initialState";
import { randomInRange } from "./rng";
import { FightOutcome, SpecialEvent } from "./types";

export function getRandomEvent(rng1: number, rng2: number): SpecialEvent {
    const allEvents: SpecialEvent[] = [
        // { eventType: "NoEvent" },
        { eventType: "ArmorEvent" },
        // { eventType: "CargoEvent" },
        // { eventType: "AutoHealEvent" },
        // { eventType: "WeaponEvent" },
        // { eventType: "TreasureEvent" },
        {
            eventType: "FightEvent",
            opponent: smallPirate,
            rngIndex: 0,
            outcome: FightOutcome.StillStanding,
            messages: [],
        },
    ];

    const randomIdx = randomInRange(0, allEvents.length - 1, rng1);

    return allEvents[randomIdx];
}
