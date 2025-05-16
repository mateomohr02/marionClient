import axios from 'axios';
import { useState, useEffect } from 'react';

const useGetCourseForum = (page = 1, limit = 10, courseId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {

        
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/forum/${courseId}?limit=${limit}&offset=${(page - 1) * limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setPosts(response.data.data);
        setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al obtener las publicaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit, courseId]);
 

  return { posts, loading, error, success };
};

export default useGetCourseForum;

