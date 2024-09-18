/** Vendor */
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

/** Local */
import appReducer from "@/store/slices/app.ts";

/** Config */
const persistConfig = {
  // Key for the persisted state in storage
  key: "root",
  // LocalStorage by default
  storage,
  // Reducers to persist
  whitelist: ["app"],
};

const rootReducer = combineReducers({
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/** Store */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export { store, persistor };
