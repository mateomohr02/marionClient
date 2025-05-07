import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../slices/courseSlice";
import blogReducer from "../slices/blogSlice";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    blog: blogReducer,
  },
});

export default store;
