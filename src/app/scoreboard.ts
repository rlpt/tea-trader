import sortBy from "lodash/sortBy";

import { ScoreBoardItem } from "./types";

const SCORES_KEY = "scores";

/**
 *  Load scores from localstorage
 */
export function loadScores() {
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

    const sorted = sortBy(
        [...scores, { score: newScore, latest: true }],
        "score",
    );

    return [...sorted].reverse();
}
