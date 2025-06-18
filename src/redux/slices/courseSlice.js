import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCourses: [],
  currentCourse: null,
  courseLessons: [],
  currentLesson: null,
  courseDetail: null,
  lessonDetail: {},
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setUserCourses: (state, action) => {
      state.userCourses = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setCourseLessons: (state, action) => {
      state.courseLessons = action.payload;
    },
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
    setLessonDetail: (state, action) => {
      state.lessonDetail = action.payload;
    },
    setCourseDetail: (state, action) => {
      state.courseDetail = action.payload;
    },
    clearCourseState: () => initialState,
  },
});

export const {
  setUserCourses,
  setCurrentCourse,
  setCourseLessons,
  setCurrentLesson,
  setLessonDetail,
  clearCourseState,
  setCourseDetail
} = courseSlice.actions;

export default courseSlice.reducer;

