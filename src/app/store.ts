import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { gameReducer } from "./gameReducer";

export const store = configureStore({
    // TODO put back
    // reducer: gameReducer(new Date().getTime().toString()),
    reducer: gameReducer("2"),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
