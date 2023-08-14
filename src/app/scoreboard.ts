import sortBy from "lodash/sortBy";

import { ScoreBoardItem } from "./types";

/**
 *  Load scores from localstorage
 */
export function loadScores() {
    return [2303, 1212, 10];
}

export function addNewScore(
    oldScores: number[],
    newScore: number,
): ScoreBoardItem[] {
    const scores = oldScores.map((score) => {
        return { score, latest: false };
    });

    return sortBy([...scores, { score: newScore, latest: true }], "score");
}

function saveScore() {}
