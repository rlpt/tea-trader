import { showFinalScore } from "./game-reducer";
import { initialState } from "./initial-state";
import { SCORES_KEY } from "./scoreboard";
import { FinalScore } from "./types";

beforeEach(() => {
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();
});

// TODO game over screen test

describe("scoreboard", () => {
    it("save scores to localstorage", async () => {
        const testScores: FinalScore[] = [
            { name: "name1", score: 1000 },
            { name: "name2", score: 0 },
            { name: "name3", score: 500 },
        ];

        localStorage.setItem(SCORES_KEY, JSON.stringify(testScores));

        const thunk = showFinalScore();

        const dispatch = jest.fn();
        const getState = () => {
            return { ...initialState, cash: 1337, name: "test name" };
        };

        const thunkResult = await thunk(dispatch, getState, {});

        const expectedDisplayScores = [
            {
                score: {
                    name: "test name",
                    score: 1337,
                },
                latest: true,
            },
            {
                score: {
                    name: "name1",
                    score: 1000,
                },
                latest: false,
            },
            {
                score: {
                    name: "name3",
                    score: 500,
                },
                latest: false,
            },
            {
                score: {
                    name: "name2",
                    score: 0,
                },
                latest: false,
            },
        ];

        const expectedSavedScores = [
            {
                name: "name1",
                score: 1000,
            },
            {
                name: "name2",
                score: 0,
            },
            {
                name: "name3",
                score: 500,
            },
            {
                name: "test name",
                score: 1337,
            },
        ];

        expect(thunkResult.payload).toEqual(expectedDisplayScores);
        expect(localStorage.__STORE__[SCORES_KEY]).toBe(
            JSON.stringify(expectedSavedScores),
        );
    });
});
