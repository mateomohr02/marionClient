import axios from "axios";
import { useState } from "react";

const useAddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addCourse = async (courseData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log(courseData, "DATA QUE SE ENVIA DESDE EL FRONT");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/add-course`,
        courseData, // 2do parámetro = body
        {
          headers: {
            Authorization: `Bearer ${token}`, // 3er parámetro = config (headers, etc.)
          },
        }
      );

      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al agregar el curso");
    } finally {
      setLoading(false);
    }
  };

  return { addCourse, loading, error, success };
};

export default useAddCourse;
