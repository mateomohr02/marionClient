import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "../slices/courseSlice";
import blogReducer from "../slices/blogSlice";
import alertReducer from "../slices/alertSlice"
import adminReducer from "../slices/adminSlice"

export const store = configureStore({
  reducer: {
    course: courseReducer,
    blog: blogReducer,
    alert: alertReducer,
    admin: adminReducer
  },
});

export default store;
