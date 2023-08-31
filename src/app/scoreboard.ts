import * as R from "remeda";

import { ScoreBoardItem } from "./types";

const SCORES_KEY = "scores";

/**
 *  Load scores from localstorage
 */
export function loadScores(): number[] {
    const scoresData = localStorage.getItem(SCORES_KEY);

    return JSON.parse(scoresData || "[]");
}

/**
 *  Save scores to localstorage
 */
export function saveScores(scores: number[]) {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
}

export function mergeScores(
    oldScores: number[],
    newScore: number,
): ScoreBoardItem[] {
    const scores = oldScores.map((score) => {
        return { score, latest: false };
    });

    const sorted = R.sortBy((item: ScoreBoardItem) => item.score)([
        ...scores,
        { score: newScore, latest: true },
    ]);

    return [...sorted].reverse();
}
