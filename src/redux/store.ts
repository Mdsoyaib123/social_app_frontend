import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


import authReducer from "./features/auth/authSlice";
import { baseApi } from "./hooks/baseApi";
import storage from "./persistStorage";

// ======================
// ROOT REDUCER
// ======================
const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

// ======================
// PERSIST CONFIG
// ======================
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only auth persists
};

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ======================
// STORE
// ======================
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(baseApi.middleware),
});

// ======================
// PERSISTOR
// ======================
export const persistor = persistStore(store);

// ======================
// TYPES
// ======================
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;