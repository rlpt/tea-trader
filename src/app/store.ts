import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { gameReducer } from "./gameReducer";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = gameReducer(new Date().getTime().toString());

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer,
) as unknown as typeof rootReducer; // unknown used here to fix redux-persist typescript error

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // suppresses a redux-persist related error
            serializableCheck: false,
        }),
});

export const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
