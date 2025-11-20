import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.ts";
import authSlice from "./authSlice.ts";

const store = configureStore({
  reducer: {
    counter: counterReducer, // Connect the counter slice to the store
    auth: authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
