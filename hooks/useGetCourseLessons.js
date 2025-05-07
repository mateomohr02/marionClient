import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseLessons,
  setCurrentCourse,
  setLessonDetail,
} from "../redux/slices/courseSlice";

export const useGetCourseLessons = (courseId) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const existingLessons = useSelector((state) => state.course.courseLessons);
  const currentCourseId = useSelector((state) => state.course.currentCourse);

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

        dispatch(setCurrentCourse(courseId));
        dispatch(setCourseLessons(response.data.data));
        dispatch(setLessonDetail(response.data.data[0]));

      } catch (err) {
        console.error("Error al obtener las lecciones:", err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (
      courseId &&
      (currentCourseId !== courseId || !existingLessons || existingLessons.length === 0)
    ) {
      fetchLessons();
    } else {
      setLoading(false); // ya había datos, no hace falta cargar
    }
  }, [courseId, currentCourseId, existingLessons, dispatch]);

  return { lessons: existingLessons, loading, error };

};
