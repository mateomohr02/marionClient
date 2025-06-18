// redux/slices/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userActivity: {}
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    resetUsers: (state) => {
      state.users = [];
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    setUserActivity: (state, action) => {
      state.userActivity = action.payload;
    },
    resetActivity: (state) => {
      state.userActivity = {};
    },
  },
});

export const { setUsers, resetUsers, deleteUser, setUserActivity, resetActivity } = adminSlice.actions;
export default adminSlice.reducer;
