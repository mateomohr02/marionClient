// redux/slices/alertSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  visible: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload;
      state.visible = true;
    },
    hideAlert: (state) => {
      state.message = "";
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
