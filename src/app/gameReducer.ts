import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";
import fromPairs from "lodash/fromPairs";

import { fight, run } from "./fight";
import {
    ALL_TEA_NAMES,
    ALL_TOWN_NAMES,
    initialState,
    MAX_TURNS,
    SPECIAL_EVENT_MULTIPLIER,
    teaInfo,
} from "./initialState";
import { getRngFromList, randomInRange } from "./rng";
import { cargoTotalSelector } from "./selectors";
import {
    Cargo,
    FightOutcome,
    PriceChange,
    RngTable,
    SpecialEvent,
    TeaPrice,
    TeaRng,
    Town,
} from "./types";

export const buyTea = createAction<{
    teaName: string;
    price: number;
    quantity: number;
}>("buyTea");

export const sellTea = createAction<{
    teaName: string;
    price: number;
    quantity: number;
}>("sellTea");

export const showChangeLocationModal = createAction("showChangeLocationModal");

export const showBuySellModal = createAction<{ tea: string }>(
    "showBuySellModal",
);

export const showEndGameModal = createAction("showEndGameModal");

export const closeModal = createAction("closeModal");

export enum FightInput {
    FightClicked,
    RunClicked,
}

export const fightMoveClicked = createAction<FightInput>("fightMoveClicked");

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const animateNextTurn = createAsyncThunk(
    "animateNextTurn",
    async (args: { nextTown: Town }, state) => {
        await timeout(1000);

        // TODO remove message
        return { nextTown: args.nextTown, message: "wot" };
    },
);

export const gameReducer = (seed: string) =>
    createReducer(initialState(seed), (builder) => {
        builder
            .addCase(animateNextTurn.pending, (state) => {
                state.wipe.content.displayTurn = state.turnNumber + 1;
                state.modal = { modalType: "NoModal" };
                state.wipe.showing = true;
            })
            .addCase(animateNextTurn.fulfilled, (state, action) => {
                // next turn
                const nextTurnNumber = state.turnNumber + 1;

                if (nextTurnNumber === MAX_TURNS) {
                    // TODO, show end game modal
                    return state;
                }

                state.turnNumber = nextTurnNumber;
                state.townsVisited.push(action.payload.nextTown);
                state.modal = { modalType: "NoModal" };

                state.wipe.showing = false;

                return state;
            })
            .addCase(closeModal, (state) => {
                state.modal = { modalType: "NoModal" };

                return state;
            })
            .addCase(showChangeLocationModal, (state) => {
                state.modal = { modalType: "ChangeLocationModal" };

                return state;
            })
            .addCase(showBuySellModal, (state, action) => {
                state.modal = {
                    modalType: "BuySellModal",
                    tea: action.payload.tea,
                };

                return state;
            })
            .addCase(showEndGameModal, (state) => {
                state.modal = { modalType: "EndGameModal" };

                return state;
            })
            .addCase(buyTea, (state, action) => {
                const { teaName, price, quantity } = action.payload;

                const holdTotal = cargoTotalSelector(state);

                const totalPrice = price * quantity;

                if (totalPrice > state.cash) {
                    return state;
                }

                if (holdTotal.current + quantity > holdTotal.max) {
                    return state;
                }

                const newTeaQuantity = state.cargo.items[teaName] + quantity;

                state.cargo.items[teaName] = newTeaQuantity;

                state.cash = state.cash - totalPrice;

                return state;
            })
            .addCase(sellTea, (state, action) => {
                const { teaName, price, quantity } = action.payload;

                const teaInHold = state.cargo.items[teaName];

                if (quantity > teaInHold) {
                    return state;
                }

                state.cash = state.cash + quantity * price;

                state.cargo.items[teaName] = teaInHold - quantity;

                return state;
            })
            .addCase(fightMoveClicked, (state, action) => {
                const rngTable = state.rngTables[state.turnNumber];

                const rngForFight = getRngFromList(
                    state.fight.rngIndex,
                    4,
                    rngTable.fight,
                );

                const [rng1, rng2, rng3, rng4] = rngForFight.items;

                const fightAction =
                    action.payload === FightInput.FightClicked ? fight : run;

                const result = fightAction(
                    state,
                    state.npc,
                    rng1,
                    rng2,
                    rng3,
                    rng4,
                );

                state.fight.rngIndex = rngForFight.newIndex;
                state.fight.outcome = result.outcome;
                state.fight.messages.push(result.message);

                state.health = result.player.health;
                state.npc.health = result.opponent.health;

                if (result.outcome === FightOutcome.PlayerWins) {
                    state.cash += result.reward;
                }

                return state;
            });
    });

const getTeaPrice = (teaName: string, rngTable: TeaRng) => {
    const { lowPrice, highPrice } = teaInfo[teaName];
    const { randomNumber, specialEvent } = rngTable[teaName];

    let price = randomInRange(lowPrice, highPrice, randomNumber);

    if (specialEvent === SpecialEvent.HighPrice) {
        price = price * SPECIAL_EVENT_MULTIPLIER;
    }

    if (specialEvent === SpecialEvent.LowPrice) {
        price = Math.ceil(price / SPECIAL_EVENT_MULTIPLIER);
    }

    return { price, specialEvent };
};

export function getTeaForTurn(
    town: Town,
    prevTown: Town,
    turnNumber: number,
    hold: Cargo,
    rngTables: RngTable[],
) {
    const currentRngTable = rngTables[turnNumber].towns[town];

    const prevTurnNumber = turnNumber === 1 ? 1 : turnNumber - 1;

    // we use previous rngTable to see if prices have increase or decreased compared
    // to previous town
    const prevRngTable = rngTables[prevTurnNumber].towns[prevTown];

    const status: { [key: string]: TeaPrice } = fromPairs(
        ALL_TEA_NAMES.map((teaName) => {
            const { price, specialEvent } = getTeaPrice(
                teaName,
                currentRngTable.teaPrice,
            );

            const prevPrices = getTeaPrice(teaName, prevRngTable.teaPrice);

            let priceChange = PriceChange.NoChange;

            if (price > prevPrices.price) {
                priceChange = PriceChange.PriceIncrease;
            } else if (price < prevPrices.price) {
                priceChange = PriceChange.PriceDecrease;
            }

            const quantity = hold.items[teaName];

            return [
                teaName,
                {
                    teaName,
                    price,
                    quantity,
                    specialEvent,
                    priceChange,
                },
            ];
        }),
    );

    return status;
}

export function currentTown(townsVisited: Town[], turnNumber: number) {
    return townsVisited[turnNumber - 1];
}

export function previousTown(townsVisited: Town[], turnNumber: number) {
    if (turnNumber === 1) {
        // return first town as previously visited town when we are on first turn
        // this avoids a null and works fine for comparing previous prices as
        // the prices will be the same
        return townsVisited[0];
    }

    return townsVisited[turnNumber - 2];
}
