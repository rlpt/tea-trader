import { PriceEvent } from "./types";

// TODO other flavour text such as health, cargo, etc

type MarketFlavourText = {
    text: string;
    impact: PriceEvent;
};

export const marketEventsFlavourText: readonly MarketFlavourText[] = [
    {
        text: "A notorious pirate crew has seized a shipment of [TEA]—its price has skyrocketed in fear and scarcity!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A sudden glut of [TEA] in the market has driven prices into the dirt. Traders scramble to offload excess stock.",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "A local festival has sparked a surge in demand for [TEA], sending prices soaring overnight.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "With smugglers flooding the port with stolen [TEA], legitimate traders are struggling to make a profit.",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "A daring privateer raid has left [TEA] stocks depleted. Only the wealthiest can afford a cup now!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A bountiful harvest has made [TEA] abundant this season—prices are at an all-time low!",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "A noble family has declared [TEA] their preferred brew, and now every aristocrat wants a taste. Expect high prices!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A warehouse fire in the spice district has made [TEA] blends a rare luxury.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A rogue wave wrecked a major shipment of [TEA], leaving merchants scrambling for what little remains.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A harsh drought has stunted this year's [TEA] crops. Traders are hoarding their reserves, driving prices through the roof!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "Word spreads that [TEA] is the latest trend among wealthy connoisseurs. Demand has never been higher!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A caravan carrying prized [TEA] was ambushed—prices have spiked as a result of this brazen theft.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A tea master's bold new blend of [TEA] has taken the market by storm, and everyone is clamoring for it.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A rival port has undercut the market, flooding it with cheap [TEA]. The competition is brutal.",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "An exceptionally cold winter has slowed tea production—every variety is seeing a sharp increase in value.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "An aging emperor has declared [TEA] to be his tea of choice, causing a mad scramble for the rare leaves.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "Local superstitions claim that this year's [TEA] harvest is cursed, leading to plummeting prices.",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "A band of rogue merchants has been caught watering down their [TEA] shipments—authentic leaves are now a hot commodity!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A new trade route has made access to [TEA] easier, causing a steep decline in its price.",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "A surge in wealthy tourists has driven demand for premium [TEA] sky-high—expect to pay a hefty sum!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A bad batch of fermented [TEA] has tarnished its reputation, forcing traders to sell at a loss.",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "A legendary tea blender has retired, and the last of their special [TEA] blend is fetching absurd prices.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "Heavy storms have delayed shipments of [TEA], making its price nearly double overnight.",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "A popular poet has written an ode to [TEA], making it the drink of the season—traders rejoice!",
        impact: PriceEvent.HighPrice,
    },
    {
        text: "The discovery of a hidden reserve of aged [TEA] has flooded the market, causing a sharp drop in value.",
        impact: PriceEvent.LowPrice,
    },
    {
        text: "A recent gambling scandal has seen tea-drinking gamblers favoring [TEA]—its price is rising with their wagers.",
        impact: PriceEvent.HighPrice,
    },
] as const;
