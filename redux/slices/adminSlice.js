// redux/slices/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
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
  },
});

export const { setUsers, resetUsers, deleteUser } = adminSlice.actions;
export default adminSlice.reducer;
