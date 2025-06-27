import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchCourses = ({ messages }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/get-all-courses`);

        if (res.data.length === 0) {
          setError(messages.noRecord)
          return;
        };

        setCourses(res.data);
      } catch (err) {
        setError(messages.error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useFetchCourses;
