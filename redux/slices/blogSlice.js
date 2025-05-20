import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogPosts: [],
  currentPost: null,
  postDetail: null,
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
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    addReplyToPostDetail: (state, action) => {
      if (state.postDetail && state.postDetail.Replies) {
        state.postDetail.Replies = [
          ...state.postDetail.Replies,
          action.payload,
        ];
      }
    },

    clearBlogState: () => initialState,
  },
});

export const {
  setBlogPosts,
  setCurrentPost,
  clearBlogState,
  setPostDetail,
  addReplyToPostDetail,
} = blogSlice.actions;

export default blogSlice.reducer;
