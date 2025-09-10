import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseLessons,
  setCurrentCourse,
  setCurrentLesson,
  setLessonDetail,
  setCourseDetail,
} from "@/redux/slices/courseSlice";

export const useGetCourseLessons = (courseName, lang) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const existingLessons = useSelector((state) => state.course.courseLessons);
  const currentCourseName = useSelector((state) => state.course.currentCourse);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/lessons/?name=${courseName}&lang=${lang}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setCourseLessons(response.data.data || []));
        dispatch(setCourseDetail(response.data.course));
        dispatch(setCurrentCourse(courseName));

        if (response.data.data && response.data.data.length > 0) {
          dispatch(setLessonDetail(response.data.data[0]));
          dispatch(setCurrentLesson(response.data.data[0].id));
        }

        hasFetched.current = true;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Solo ejecuta si no se ha cargado aún
    if (
      courseName &&
      !hasFetched.current &&
      (currentCourseName !== courseName || !existingLessons || existingLessons.length === 0)
    ) {
      fetchLessons();
    } else {
      setLoading(false); // ya había datos, no hace falta cargar
    }
  }, [courseName, dispatch]); // removimos las dependencias que cambian con dispatch

  return { lessons: existingLessons, loading, error };
};
