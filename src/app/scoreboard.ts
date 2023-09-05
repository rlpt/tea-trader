import * as R from "remeda";

import { FinalScore, ScoreboardItem } from "./types";

const SCORES_KEY = "scores";

/**
 *  Load scores from localstorage
 */
export function loadScores(): FinalScore[] {
    const scoresData = localStorage.getItem(SCORES_KEY);

    return JSON.parse(scoresData || "[]");
}

/**
 *  Save scores to localstorage
 */
export function saveScores(scores: FinalScore[]) {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
}

export function mergeScores(
    oldScores: FinalScore[],
    newScore: FinalScore,
): { toSave: FinalScore[]; toShow: ScoreboardItem[] } {
    const oldScoresToShow = oldScores.map((score) => {
        return { score, latest: false };
    });

    const toShow = R.sortBy((item: ScoreboardItem) => item.score.score)([
        ...oldScoresToShow,
        { score: { name: newScore.name, score: newScore.score }, latest: true },
    ]);

    return {
        toSave: [...oldScores, newScore],
        toShow: R.reverse(toShow),
    };
}
