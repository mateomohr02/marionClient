import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogPosts: [],
  forumPosts: [],
  currentCourse: null,
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
    setForumPost: (state, action) => {
      state.forumPosts = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    // blogSlice.js
    addPostToForum: (state, action) => {
      state.forumPosts.unshift(action.payload); // Agrega el nuevo post al inicio del array
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
  setForumPost,
  setCurrentCourse,
  addPostToForum,
  addReplyToPostDetail,
} = blogSlice.actions;

export default blogSlice.reducer;
