import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogPosts: [],
  currentPost: null,
  comments: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogPosts: (state, action) => {
      state.blogPosts = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    clearBlogState: () => initialState,
  },
});

export const {
  setBlogPosts,
  setCurrentPost,
  setComments,
  clearBlogState,
} = blogSlice.actions;

export default blogSlice.reducer;
