import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { gameReducer } from "./gameReducer";
import { PACKAGE_VERSION } from "./version";

console.log("root-" + PACKAGE_VERSION);

const persistConfig = {
    // Change in version will make new key to save localstorage, this prevents new code
    // conflicting with old stale saved state
    key: "root-" + PACKAGE_VERSION,
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
