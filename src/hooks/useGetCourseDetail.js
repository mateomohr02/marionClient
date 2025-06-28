import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetCourseDetail = (slug, locale, { messages }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug || !locale) {
      setCourse(null);
      setError(messages.badRequest || "Bad Request");
      setLoading(false);
      return;
    }

    const fetchCourseDetail = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setError(messages.unauthorized || "Unauthorized");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/get-course-by-name?name=${slug}&lang=${locale}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.data || !res.data.course) {
          setError(messages.noRecord || "No records found");
          setCourse(null);
        } else {
          setCourse(res.data.course);
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          const { status, data } = err.response;

          if (data?.code === "COURSE_NOT_FOUND") {
            setError(messages.noRecord || "No records found");
          } else if (data?.code === "BAD_REQUEST") {
            setError(messages.badRequest || "Bad Request");
          } else if (data?.code === "SERVER_ERROR") {
            setError(messages.serverError || "Server Error");
          } else if (status === 401) {
            setError(messages.unauthorized || "Unauthorized");
          } else {
            setError(messages.serverError || "Server Error");
          }
        } else {
          setError(messages.serverError || "Server Error");
        }

        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [slug, locale]);

  return { course, loading, error };
};

export default useGetCourseDetail;
