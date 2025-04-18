import {
    createAction,
    createAsyncThunk,
    createReducer,
    createSelector,
} from "@reduxjs/toolkit";
import * as R from "remeda";

import { totalItems } from "./cargo";
import { calculateDebtPeriod } from "./debt";
import { getRandomEvent, getRandomPirateEvent } from "./events";
import { fight, run } from "./fight";
import {
    ALL_TOWN_NAMES,
    EXTRA_LARGE_PIRATE,
    initialState,
    INTEREST_RATE,
    LARGE_PIRATE,
    MAX_TURNS,
    MEDIUM_PIRATE,
    SMALL_PIRATE,
} from "./initial-state";
import { getPriceMessages } from "./price-messages";
import { getRngFromList } from "./rng";
import {
    loadScores,
    mapScoresToBoardItems,
    mergeScores,
    saveScores,
    sortScores,
} from "./scoreboard";
import { RootState } from "./store";
import { getTeaEvents, getTeaForTurn } from "./tea-price";
import {
    Cargo,
    DebugAction,
    Fighter,
    FightInProgress,
    FightOutcome,
    GameScreen,
    PriceEvent,
    Town,
} from "./types";

function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const nextTurn = createAsyncThunk(
    "nextTurn",
    async (args: { nextTown: Town }) => {
        await timeout(1000);

        return { nextTown: args.nextTown };
    },
);

export const startGame = createAsyncThunk("startGame", async (args: string) => {
    await timeout(1000);

    return args;
});

export const restart = createAsyncThunk("restart", async () => {
    await timeout(1000);

    // create seed for new game
    // TODO pass in seed as param
    return new Date().getTime().toString();
});

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

export const showFinalScore = createAsyncThunk(
    "showFinalScore",
    async (args, { getState }) => {
        const state = getState() as RootState;

        const scores = loadScores();
        const { toShow, toSave } = mergeScores(scores, {
            name: state.name,
            score: state.cash - state.debt,
        });

        saveScores(toSave);

        await timeout(1000);

        return toShow;
    },
);

export const showScoreboard = createAction("showScoreboard", () => {
    const scores = loadScores();

    return {
        payload: R.pipe(scores, mapScoresToBoardItems, sortScores),
    };
});

export const showBuySellModal = createAction<{ tea: string }>(
    "showBuySellModal",
);

export const showEndGameModal = createAction("showEndGameModal");

export const closeModal = createAction("closeModal");

export const showBankModal = createAction("showBankModal");

export const endSpecialEvent = createAction("endSpecialEvent");

export const buyArmor = createAction<{
    cost: number;
    value: number;
}>("buyArmor");

export const buyWeapon = createAction<{
    cost: number;
    value: number;
}>("buyWeapon");

export const buyCargoSpace = createAction<{
    cost: number;
    value: number;
}>("buyCargoSpace");

export const heal = createAction<{
    value: number;
}>("heal");

export const debug = createAction<DebugAction>("debug");

export const showMenu = createAction<boolean>("showMenu");

export const backToGame = createAction("backToGame");

export const repayBank = createAction<{ repaymentAmount: number }>("repayBank");

// TODO move to types
export enum FightInput {
    FightClicked,
    RunClicked,
}

export const fightMoveClicked = createAction<FightInput>("fightMoveClicked");

export const gameReducer = (seed: string) =>
    createReducer(initialState(seed), (builder) => {
        builder
            .addCase(startGame.pending, (state) => {
                state.wipe.content = {
                    contentType: "TextWipe",
                    text: "Turn 1",
                };

                state.wipe.showing = true;
            })
            .addCase(startGame.fulfilled, (state, action) => {
                state.name = action.payload;
                state.screen = [GameScreen.Trade];
                state.wipe = {
                    ...state.wipe,
                    showing: false,
                };
            })
            .addCase(restart.pending, (state) => {
                state.wipe.content = {
                    contentType: "TextWipe",
                    text: "New Game",
                };

                state.wipe.showing = true;
            })
            .addCase(restart.fulfilled, (state, action) => {
                return {
                    ...initialState(action.payload),
                    wipe: {
                        ...state.wipe,
                        showing: false,
                    },
                };
            })
            .addCase(nextTurn.pending, (state) => {
                const nextTurnNumber = state.turnNumber + 1;

                if (nextTurnNumber === MAX_TURNS) {
                    state.wipe.content = {
                        contentType: "TextWipe",
                        text: "Final Turn",
                    };
                } else {
                    state.wipe.content = {
                        contentType: "TextWipe",
                        text: `Turn ${nextTurnNumber + 1}`,
                    };
                }

                state.modal = { modalType: "NoModal" };
                state.wipe.showing = true;
            })
            .addCase(nextTurn.fulfilled, (state, action) => {
                const nextTurnNumber = state.turnNumber + 1;
                state.modal = { modalType: "NoModal" };
                state.wipe.showing = false;

                state.turnNumber = nextTurnNumber;
                state.townsVisited.push(action.payload.nextTown);

                const rngTable = state.rngTables[nextTurnNumber];

                const teaEvents = getTeaEvents(
                    rngTable.towns[action.payload.nextTown].teaPrice,
                );

                // if there are any tea events, show the first one in a modal
                if (teaEvents.length > 0) {
                    state.modal = {
                        modalType: "TeaEventModal",
                        event: teaEvents[0],
                    };
                }

                state.event = getRandomEvent(
                    state,
                    rngTable.specialEvent,
                    rngTable.specialEventValue,
                );

                // if no special event and there is a tea price move event always fight a pirate
                if (
                    state.event.eventType === "NoEvent" &&
                    teaEvents.length > 0
                ) {
                    state.event = getRandomPirateEvent(rngTable.specialEvent);
                }

                if (state.debt > 0) {
                    state.debt = calculateDebtPeriod(state.debt, INTEREST_RATE);
                }
            })
            .addCase(showFinalScore.pending, (state) => {
                state.wipe.content = {
                    contentType: "TextWipe",
                    text: "Game Over",
                };

                state.wipe.showing = true;

                return state;
            })
            .addCase(showFinalScore.fulfilled, (state, action) => {
                state.wipe.showing = false;
                state.screen = [GameScreen.GameOver];
                state.scoreboard = action.payload;
            })
            .addCase(closeModal, (state) => {
                state.modal = { modalType: "NoModal" };
            })
            .addCase(showChangeLocationModal, (state) => {
                state.modal = { modalType: "ChangeLocationModal" };
            })
            .addCase(showBuySellModal, (state, action) => {
                state.modal = {
                    modalType: "BuySellModal",
                    tea: action.payload.tea,
                };
            })
            .addCase(showEndGameModal, (state) => {
                state.modal = { modalType: "EndGameModal" };
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
            })
            .addCase(sellTea, (state, action) => {
                const { teaName, price, quantity } = action.payload;

                const teaInHold = state.cargo.items[teaName];

                if (quantity > teaInHold) {
                    return state;
                }

                state.cash = state.cash + quantity * price;

                state.cargo.items[teaName] = teaInHold - quantity;
            })
            .addCase(fightMoveClicked, (state, action) => {
                if (state.event.eventType === "FightEvent") {
                    const fightEvent = state.event;

                    const rngTable = state.rngTables[state.turnNumber];

                    const rngForFight = getRngFromList(
                        fightEvent.rngIndex,
                        4,
                        rngTable.fight,
                    );

                    const [rng1, rng2, rng3, rng4] = rngForFight.items;

                    const fightFn =
                        action.payload === FightInput.FightClicked
                            ? fight
                            : run;

                    const result = fightFn(
                        state,
                        fightEvent.opponent,
                        rng1,
                        rng2,
                        rng3,
                        rng4,
                    );

                    state.event.rngIndex = rngForFight.newIndex;
                    state.event.outcome = result.outcome;
                    state.event.messages.push(result.message);

                    state.health = result.player.health;
                    state.event.opponent.health = result.opponent.health;

                    if (result.outcome === FightOutcome.PlayerWins) {
                        // TODO have reward be random % of bank balance
                        state.cash += result.reward;
                    }
                }
            })
            .addCase(endSpecialEvent, (state) => {
                state.event = { eventType: "NoEvent" };
            })
            .addCase(buyArmor, (state, action) => {
                const { cost, value } = action.payload;

                if (cost > state.cash) {
                    return state;
                }

                state.cash -= cost;
                state.defense += value;
            })
            .addCase(buyWeapon, (state, action) => {
                const { cost, value } = action.payload;

                if (cost > state.cash) {
                    return state;
                }

                state.cash -= cost;
                state.strength += value;
            })
            .addCase(buyCargoSpace, (state, action) => {
                const { cost, value } = action.payload;

                if (cost > state.cash) {
                    return state;
                }

                state.cash -= cost;
                state.cargo.maxSize += value;
            })
            .addCase(heal, (state, action) => {
                state.health += action.payload.value;
            })
            .addCase(showMenu, (state, action) => {
                if (action.payload) {
                    state.modal = { modalType: "MenuModal" };
                } else {
                    state.modal = { modalType: "NoModal" };
                }
            })
            .addCase(backToGame, (state) => {
                if (state.screen.length > 1) {
                    // pop off top screen of stack
                    state.screen = R.dropLast(state.screen, 1);
                }
            })
            .addCase(showScoreboard, (state, action) => {
                state.scoreboard = action.payload;
                // pop scoreboard on top of screen stack
                state.screen = [...state.screen, GameScreen.Scoreboard];
            })
            .addCase(debug, (state, action) => {
                if (action.payload === DebugAction.FightSmallPirate) {
                    state.event = {
                        eventType: "FightEvent",
                        opponent: SMALL_PIRATE,
                        rngIndex: 0,
                        outcome: FightOutcome.StillStanding,
                        messages: [],
                    };
                } else if (action.payload === DebugAction.FightMediumPirate) {
                    state.event = {
                        eventType: "FightEvent",
                        opponent: MEDIUM_PIRATE,
                        rngIndex: 0,
                        outcome: FightOutcome.StillStanding,
                        messages: [],
                    };
                } else if (action.payload === DebugAction.FightLargePirate) {
                    state.event = {
                        eventType: "FightEvent",
                        opponent: LARGE_PIRATE,
                        rngIndex: 0,
                        outcome: FightOutcome.StillStanding,
                        messages: [],
                    };
                } else if (
                    action.payload === DebugAction.FightExtraLargePirate
                ) {
                    state.event = {
                        eventType: "FightEvent",
                        opponent: EXTRA_LARGE_PIRATE,
                        rngIndex: 0,
                        outcome: FightOutcome.StillStanding,
                        messages: [],
                    };
                } else if (action.payload === DebugAction.ArmorEvent) {
                    state.event = {
                        eventType: "ArmorEvent",
                    };
                } else if (action.payload === DebugAction.WeaponEvent) {
                    state.event = {
                        eventType: "WeaponEvent",
                    };
                } else if (action.payload === DebugAction.CargoEvent) {
                    state.event = {
                        eventType: "CargoEvent",
                    };
                } else if (action.payload === DebugAction.HealEvent) {
                    state.event = {
                        eventType: "HealEvent",
                    };
                } else if (action.payload === DebugAction.ShowBank) {
                    state.modal = { modalType: "BankModal" };
                }
            })
            .addCase(showBankModal, (state) => {
                state.modal = { modalType: "BankModal" };
            })
            .addCase(repayBank, (state, action) => {
                state.cash -= action.payload.repaymentAmount;
                state.debt -= action.payload.repaymentAmount;

                state.modal = { modalType: "NoModal" };
            });
    });

export const townSelector = (state: RootState) => {
    return state.townsVisited[state.turnNumber];
};

export const somethingHappeningSelector = createSelector(
    [
        (state: RootState) => state.turnNumber,
        (state: RootState) => state.rngTables,
    ],
    (turnNumber, rngTables) => {
        // Look ahead to next turn to see if anything is happening
        const rngTable = rngTables[turnNumber + 1];

        return ALL_TOWN_NAMES.map((town) => {
            const prices = rngTable.towns[town];

            for (const teas of Object.values(prices)) {
                for (const tea of Object.values(teas)) {
                    if (tea.specialEvent !== PriceEvent.NoPriceEvent) {
                        return { town, somethingHappening: true };
                    }
                }
            }

            return { town, somethingHappening: false };
        });
    },
);

export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;
export const currentRngTableSelector = (state: RootState) =>
    state.rngTables[state.turnNumber];
export const cashSelector = (state: RootState) => state.cash;
export const cargoSelector = (state: RootState) => state.cargo;
export const wipeSelector = (state: RootState) => state.wipe;
export const specialEventSelector = (state: RootState) => state.event;
export const scoreboardSelector = (state: RootState) => state.scoreboard;
export const screenSelector = (state: RootState) => R.last(state.screen);
export const modalSelector = (state: RootState) => state.modal;

export const visualTurnSelector = createSelector(
    [turnNumberSelector],
    (turnNumber) => ({
        turn: turnNumber + 1,
        maxTurns: MAX_TURNS + 1,
    }),
);

export const isLastTurnSelector = (state: RootState) =>
    state.turnNumber === MAX_TURNS;

export const playerSelector = createSelector(
    [
        (state) => state.name,
        (state) => state.health,
        (state) => state.strength,
        (state) => state.defense,
    ],
    (name, health, strength, defense): Fighter => {
        return {
            name,
            health,
            strength,
            defense,
        };
    },
);

export const cargoTotalSelector = createSelector(
    [cargoSelector],
    (hold: Cargo) => {
        return {
            current: totalItems(hold.items),
            max: hold.maxSize,
        };
    },
);

export const teaPriceSelector = createSelector(
    [townSelector, cargoSelector, currentRngTableSelector],
    (town, cargo, rngTable) => {
        return getTeaForTurn(town, cargo, rngTable);
    },
);

export const fightSelector = createSelector(
    [(state: RootState) => state.event, playerSelector],
    (event, player): FightInProgress | null => {
        if (event.eventType === "FightEvent") {
            return {
                outcome: event.outcome,
                player,
                opponent: event.opponent,
                messages: event.messages,
            };
        }

        return null;
    },
);

export const priceMessagesSelector = createSelector(
    [turnNumberSelector, townSelector, rngTablesSelector, isLastTurnSelector],
    (currentTurn, town, rngTables, isLastTurn) => {
        if (isLastTurn) {
            // don't return any messages if player is on last turn
            return [];
        }

        // add one to current turn as we want the prices messages for the next turn
        return getPriceMessages(currentTurn + 1, town, rngTables);
    },
);

export const financeSelector = createSelector(
    [cashSelector, (state: RootState) => state.debt],
    (cash, debt) => {
        return { cash, debt };
    },
);
