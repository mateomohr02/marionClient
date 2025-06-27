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

      try {
        if (!token) {
          setError(messages.unauthorized || "Unauthorized");
          setLoading(false);
          return;
        }

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
          setLoading(false);
          return;
        }

        setCourse(res.data.course);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(messages.serverError || "Server Error");
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
