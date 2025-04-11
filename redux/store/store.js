import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Reducer de ejemplo

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Agrega más reducers aquí
  },
});

export default store;
