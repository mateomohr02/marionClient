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

export const useGetCourseLessons = (courseId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const existingLessons = useSelector((state) => state.course.courseLessons);
  const currentCourseId = useSelector((state) => state.course.currentCourse);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchLessons = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/lessons/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(setCourseLessons(response.data.data || []));
        dispatch(setCourseDetail(response.data.course));
        dispatch(setCurrentCourse(courseId));

        if (response.data.data && response.data.data.length > 0) {
          dispatch(setLessonDetail(response.data.data[0]));
          dispatch(setCurrentLesson(response.data.data[0].id));
        }

        hasFetched.current = true;
      } catch (err) {
        console.error("Error al obtener las lecciones:", err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Solo ejecuta si no se ha cargado aún
    if (
      courseId &&
      !hasFetched.current &&
      (currentCourseId !== courseId || !existingLessons || existingLessons.length === 0)
    ) {
      fetchLessons();
    } else {
      setLoading(false); // ya había datos, no hace falta cargar
    }
  }, [courseId, dispatch]); // removimos las dependencias que cambian con dispatch

  return { lessons: existingLessons, loading, error };
};
