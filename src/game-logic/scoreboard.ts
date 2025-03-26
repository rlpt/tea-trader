import * as R from "remeda";

import { FinalScore, ScoreboardItem } from "./types";

export const SCORES_KEY = "scores";

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
    const oldScoresToShow = mapScoresToBoardItems(oldScores);

    const toShow = sortScores([
        ...oldScoresToShow,
        { score: { name: newScore.name, score: newScore.score }, latest: true },
    ]);

    return {
        toSave: [...oldScores, newScore],
        toShow,
    };
}

export function mapScoresToBoardItems(oldScores: FinalScore[]) {
    return oldScores.map((score) => {
        return { score, latest: false };
    });
}

export function sortScores(scores: ScoreboardItem[]): ScoreboardItem[] {
    return R.pipe(
        scores,
        R.sortBy((item: ScoreboardItem) => item.score.score),
        R.reverse(),
    );
}
