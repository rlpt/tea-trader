import * as R from "remeda";

import * as rng from "./rng";
import { GameScreen, GameState, MenuStatus, Tea, TeaInfo, Town } from "./types";

export const MAX_TURNS = 29;
export const STARTING_CASH = 2000;
export const STARTING_CARGO_SIZE = 100;
export const STARTING_HEALTH = 100;
export const STARTING_STRENGTH = 30;
export const STARTING_DEFENSE = 10; //3;
export const RUN_CHANCE = 3;
export const DAMAGE_VARIABLE = 20;

export const SPECIAL_TEA_PRICE_CHANCE = 100;
export const SPECIAL_TEA_PRICE_MULTIPLIER = 2;

export const ALL_TEA_NAMES = Object.values(Tea);
export const ALL_TOWN_NAMES = Object.values(Town);

export const DEFENSE_INCREASE_COST = 25000;
export const DEFENSE_INCREASE_VALUE = 10;
export const CARGO_INCREASE_COST = 5000;
export const CARGO_INCREASE_VALUE = 50;
export const STRENGTH_INCREASE_COST = 30000;
export const STRENGTH_INCREASE_VALUE = 15;
export const HEAL_EVENT_INCREASE = 5;

export const initialState = (seed: string): GameState => {
    return {
        seed,
        screen: GameScreen.Start,
        turnNumber: 0,
        townsVisited: [Town.London],
        cash: STARTING_CASH,
        cargo: {
            maxSize: STARTING_CARGO_SIZE,
            items: R.fromPairs(ALL_TEA_NAMES.map((teaName) => [teaName, 0])),
        },
        name: "nameless",
        health: STARTING_HEALTH,
        strength: STARTING_STRENGTH,
        defense: STARTING_DEFENSE,
        event: { eventType: "NoEvent" },
        // event: {
        //     eventType: "FightEvent",
        //     opponent: SMALL_PIRATE,
        //     rngIndex: 0,
        //     outcome: FightOutcome.StillStanding,
        //     messages: [
        //         { text: "You hit for 4 and took 1 damage", key: "1" },
        //         { text: "You hit for 4 and took 1 damage", key: "2" },
        //         { text: "You hit for 4 and took 1 damage", key: "3" },
        //         { text: "You hit for 4 and took 1 damage", key: "4" },
        //         { text: "You hit for 4 and took 1 damage", key: "5" },
        //         { text: "You hit for 4 and took 1 damage", key: "6" },
        //         { text: "You hit for 4 and took 1 damage", key: "7" },
        //         { text: "You hit for 4 and took 1 damage", key: "8" },
        //         { text: "You hit for 4 and took 1 damage", key: "9" },
        //         { text: "You hit for 4 and took 1 damage", key: "10" },
        //         { text: "You hit for 4 and took 1 damage", key: "11" },
        //         { text: "You hit for 4 and took 1 damage", key: "12" },
        //     ],
        // },
        menu: MenuStatus.Initial,
        modal: { modalType: "NoModal" },
        wipe: {
            showing: false,
            content: {
                contentType: "NoWipe",
            },
        },
        scoreboard: [],
        rngTables: rng.getRngTables(seed),
    };
};

export const teaInfo: Readonly<TeaInfo> = {
    [Tea.EarlGrey]: {
        lowPrice: 600,
        highPrice: 1400,
    },
    [Tea.Assam]: {
        lowPrice: 100,
        highPrice: 700,
    },
    [Tea.Darjeeling]: {
        lowPrice: 5000,
        highPrice: 14000,
    },
    [Tea.LapsangSouchong]: {
        lowPrice: 1500,
        highPrice: 4500,
    },
    [Tea.GreenTea]: {
        lowPrice: 70,
        highPrice: 250,
    },
    [Tea.WhiteTea]: {
        lowPrice: 300,
        highPrice: 900,
    },
    [Tea.Matcha]: {
        lowPrice: 1000,
        highPrice: 4500,
    },
    [Tea.EnglishBreakfast]: {
        lowPrice: 10,
        highPrice: 60,
    },
    [Tea.LadyGrey]: {
        lowPrice: 500,
        highPrice: 1300,
    },
    [Tea.Longjing]: {
        lowPrice: 15000,
        highPrice: 30000,
    },
};

export const SMALL_PIRATE = {
    name: "Small Pirate",
    maxHealth: 20,
    health: 20,
    strength: 20,
    defense: 5,
    minReward: 2000,
    maxReward: 5000,
    level: 1,
};

export const SHIP_NAMES = [
    "Green Dragon",
    "Oolong Voyager",
    "Jasmine Wind",
    "Earl Greyhound",
    "Rooibos Runner",
    "Matcha Mariner",
    "Silver Needle Sailer",
    "Darjeeling Drifter",
    "Lapsang Lark",
    "Sencha Seafarer",
    "Ceylon Clipper",
    "Assam Adventurer",
    "Chamomile Cloud",
    "Golden Tippy Tide",
    "Puerh Pioneer",
    "White Peony Wave",
    "Teaspoon Traveler",
    "Chai Challenger",
    "Tisane Tide",
    "Brewed Bounty",
    "Infusion Illusion",
    "Silver Sprout",
    "Steeping Storm",
    "Bancha Breeze",
    "Camellia Current",
    "Hibiscus Haven",
    "Teapot Tempest",
    "Typhoon Tea",
    "Biluochun Bliss",
    "Genmaicha Glide",
    "Moonlight Mist",
    "Phoenix Feather",
    "Kukicha Cruiser",
    "Yunnan Yacht",
    "Crimson Camellia",
    "Whirling Whisk",
    "Pearl Pinnacle",
    "Osmanthus Odyssey",
    "Tangy Tieguanyin",
    "Blooming Blossom",
    "Tea Leaf Lagoon",
    "Teahouse Trawler",
    "Liquid Luck",
    "Pouchong Plunge",
    "Seaweed Serenity",
    "Tempered Tumbler",
    "Oriental Ovation",
    "Golden Guan Yin",
    "Verdant Voyage",
    "Brewed Brigantine",
    "Aromatic Aegis",
    "Twilight Tea Turn",
    "Morning Mistral",
    "Sip 'n' Sail",
    "Keemun Kite",
    "Liquid Lark",
    "Cinnamon Sailer",
    "Bergamot Barge",
    "Tealeaf Tornado",
    "Brewed Bounty",
    "Rosehip Rambler",
    "Currant Cutter",
    "Honeybush Horizon",
    "Fennel Frigate",
    "Starry Souchong",
    "Terracotta Traveler",
    "Ebony Elixir",
    "Melon Seed Mirage",
    "Tea Twilight",
    "Tarry Lapsang Lane",
    "Teacup Tempest",
    "Liquorice Lagoon",
    "Milky Oolong Oasis",
    "Floating Flask",
    "Peppermint Prow",
    "Lemon Verbena Voyager",
    "Brewed Beyond",
    "Tannin Temptress",
    "Nectar Navigator",
    "Ginger Gold",
    "Turmeric Tug",
    "Lavender Lark",
    "Cardamom Current",
    "Spiced Sails",
    "Flavored Float",
    "Citrus Cutter",
    "Sweetened Sea",
    "Infused Isle",
    "Dainty Drifter",
    "Radiant Rose",
    "Floating Fortuna",
    "Black Blend Brig",
    "Nautical Nectar",
    "Blue Mountain Muse",
    "Coastal Chai",
    "Vanilla Voyage",
    "Fruity Frigate",
    "Ocean Oolong",
    "Delicate Drizzle",
    "Celestial Clipper",
];

export const PIRATE_SHIP_NAMES = [
    "Black Pearl",
    "Sea Serpent's Wrath",
    "Crimson Marauder",
    "Devil's Dagger",
    "Golden Rogue",
    "Plundering Phoenix",
    "Banshee's Wail",
    "Jolly Roger's Revenge",
    "Sea Wolf",
    "Cursed Cutlass",
    "Ghostly Galleon",
    "Dreadnaught Drifter",
    "Silent Storm",
    "Midnight Raider",
    "Shadow Scepter",
    "Neptune's Nemesis",
    "Lost Leviathan",
    "Wicked Wench",
    "Sea Specter",
    "Corsair's Curse",
    "Ocean's Outlaw",
    "Haunting Harbinger",
    "Siren's Song",
    "Bloodthirsty Brigantine",
    "Vengeful Voyager",
    "Savage Sea",
    "Plague's Prow",
    "Moonlit Marauder",
    "Treacherous Tide",
    "Scarlet Sabre",
    "Buccaneer's Bounty",
    "Raging Raven",
    "Tempest's Terror",
    "Sea's Shadow",
    "Pillaging Phoenix",
    "Eclipse Enigma",
    "Phantom's Fang",
    "Ghost Gull",
    "Devil's Delight",
    "Harbinger of Havoc",
    "Sea's Scourge",
    "Wind Walker",
    "Cursed Corsair",
    "Stormy Scepter",
    "Silent Sabotage",
    "Grim Galleon",
    "Dark Dagger",
    "Rogue's Rapture",
    "Lurking Leviathan",
    "Sea Reaper",
    "Dreaded Drifter",
    "Gory Gale",
    "Whispering Wraith",
    "Bloody Banshee",
    "Twilight Terror",
    "Sea's Snare",
    "Ocean's Omen",
    "Abyssal Avenger",
    "Nautical Nightmare",
    "Tempestuous Tide",
    "Dusky Dagger",
    "Mermaid's Maw",
    "Sunken Sabre",
    "Sea's Secret",
    "Phantom's Plunder",
    "Midnight Mirage",
    "Vicious Voyager",
    "Ocean's Oracle",
    "Harrowing Haul",
    "Tempest's Triumph",
    "Shadowed Siren",
    "Cursed Kraken",
    "Windy Wraith",
    "Looming Leviathan",
    "Ghostly Gull",
    "Ghoulish Gale",
    "Wandering Wolf",
    "Desolate Dagger",
    "Fiery Fortune",
    "Seafarer's Scythe",
    "Dreadful Dawn",
    "Nefarious Neptune",
    "Haunting Hurricane",
    "Savage Sails",
    "Ruthless Raider",
    "Brazen Brigantine",
    "Silent Scourge",
    "Mysterious Mariner",
    "Sea's Sentinel",
    "Abyssal Abyss",
    "Ravenous Rogue",
    "Daring Dreadnought",
    "Vengeful Vortex",
    "Midnight Marauder",
    "Sea's Scar",
    "Treacherous Temptress",
    "Ocean's Onslaught",
    "Storm's Sting",
    "Gilded Ghoul",
    "Whispering Wind",
];
