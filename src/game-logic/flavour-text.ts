type PriceImpact = "HIGH" | "LOW";

type MarketFlavourText = {
    text: string;
    impact: PriceImpact;
};

export const marketEvents: MarketFlavourText[] = [
    {
        text: "A notorious pirate crew has seized a shipment of [TEA]—its price has skyrocketed in fear and scarcity!",
        impact: "HIGH",
    },
    {
        text: "A sudden glut of [TEA] in the market has driven prices into the dirt. Traders scramble to offload excess stock.",
        impact: "LOW",
    },
    {
        text: "A local festival has sparked a surge in demand for [TEA], sending prices soaring overnight.",
        impact: "HIGH",
    },
    {
        text: "With smugglers flooding the port with stolen [TEA], legitimate traders are struggling to make a profit.",
        impact: "LOW",
    },
    {
        text: "A daring privateer raid has left [TEA] stocks depleted. Only the wealthiest can afford a cup now!",
        impact: "HIGH",
    },
    {
        text: "A bountiful harvest has made [TEA] abundant this season—prices are at an all-time low!",
        impact: "LOW",
    },
    {
        text: "A noble family has declared [TEA] their preferred brew, and now every aristocrat wants a taste. Expect high prices!",
        impact: "HIGH",
    },
    {
        text: "A warehouse fire in the spice district has made [TEA] blends a rare luxury.",
        impact: "HIGH",
    },
    {
        text: "A rogue wave wrecked a major shipment of [TEA], leaving merchants scrambling for what little remains.",
        impact: "HIGH",
    },
    {
        text: "A harsh drought has stunted this year's [TEA] crops. Traders are hoarding their reserves, driving prices through the roof!",
        impact: "HIGH",
    },
    {
        text: "Word spreads that [TEA] is the latest trend among wealthy connoisseurs. Demand has never been higher!",
        impact: "HIGH",
    },
    {
        text: "A caravan carrying prized [TEA] was ambushed—prices have spiked as a result of this brazen theft.",
        impact: "HIGH",
    },
    {
        text: "A tea master's bold new blend of [TEA] has taken the market by storm, and everyone is clamoring for it.",
        impact: "HIGH",
    },
    {
        text: "A rival port has undercut the market, flooding it with cheap [TEA]. The competition is brutal.",
        impact: "LOW",
    },
    {
        text: "An exceptionally cold winter has slowed tea production—every variety is seeing a sharp increase in value.",
        impact: "HIGH",
    },
    {
        text: "An aging emperor has declared [TEA] to be his tea of choice, causing a mad scramble for the rare leaves.",
        impact: "HIGH",
    },
    {
        text: "Local superstitions claim that this year's [TEA] harvest is cursed, leading to plummeting prices.",
        impact: "LOW",
    },
    {
        text: "A band of rogue merchants has been caught watering down their [TEA] shipments—authentic leaves are now a hot commodity!",
        impact: "HIGH",
    },
    {
        text: "A new trade route has made access to [TEA] easier, causing a steep decline in its price.",
        impact: "LOW",
    },
    {
        text: "A surge in wealthy tourists has driven demand for premium [TEA] sky-high—expect to pay a hefty sum!",
        impact: "HIGH",
    },
    {
        text: "A bad batch of fermented [TEA] has tarnished its reputation, forcing traders to sell at a loss.",
        impact: "LOW",
    },
    {
        text: "A legendary tea blender has retired, and the last of their special [TEA] blend is fetching absurd prices.",
        impact: "HIGH",
    },
    {
        text: "Heavy storms have delayed shipments of [TEA], making its price nearly double overnight.",
        impact: "HIGH",
    },
    {
        text: "A popular poet has written an ode to [TEA], making it the drink of the season—traders rejoice!",
        impact: "HIGH",
    },
    {
        text: "The discovery of a hidden reserve of aged [TEA] has flooded the market, causing a sharp drop in value.",
        impact: "LOW",
    },
    {
        text: "A recent gambling scandal has seen tea-drinking gamblers favoring [TEA]—its price is rising with their wagers.",
        impact: "HIGH",
    },
] as const;
