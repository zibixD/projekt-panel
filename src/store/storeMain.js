import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import companyReducer from "./companyReducer";
import uiReducer from "./uiReducer";

const reducers = combineReducers({
  auth: authReducer,
  company: companyReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(thunk),
  devTools: true,
});

export const persistor = persistStore(store);

export const dispatch = store.dispatch;
