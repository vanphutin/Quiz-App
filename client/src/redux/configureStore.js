import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Chỉ persist phần user của state
};

// Tạo persist reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userSlice,
  })
);

// Tạo store với persist reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Tạo persistor
const persistor = persistStore(store);

export { store, persistor };
