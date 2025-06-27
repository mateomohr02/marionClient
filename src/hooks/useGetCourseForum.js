import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setForumPost,
  setCurrentCourse
} from "@/redux/slices/blogSlice";
import { useLocale } from 'next-intl';

const useGetCourseForum = (page = 1, limit = 10, courseName, { messages }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.forumPosts);
  const currentCourseName = useSelector((state) => state.blog.currentCourse);
  const locale = useLocale();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    hasFetched.current = false;
  }, [courseName]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/forum/${courseName}?limit=${limit}&offset=${(page - 1) * limit}&lang=${locale}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Validación: si el array de posts está vacío, lanzar mensaje personalizado
        
          dispatch(setForumPost(response.data.data));
          dispatch(setCurrentCourse(courseName));
        

        hasFetched.current = true;
      } catch (err) {
        const apiMsg = err.response?.data?.message;
        if (err.response?.status === 404) {
          setError(messages?.NoPosts || apiMsg || "No se encontraron publicaciones");
        } else {
          setError(messages?.ServerError || apiMsg || "Error al obtener publicaciones");
        }
      } finally {
        setLoading(false);
      }
    };

    if (courseName && !hasFetched.current && currentCourseName !== courseName) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [courseName, currentCourseName, page, limit]);

  return { posts, loading, error };
};

export default useGetCourseForum;
