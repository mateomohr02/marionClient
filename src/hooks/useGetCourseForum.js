import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setForumPost,
  setCurrentCourse
} from "@/redux/slices/blogSlice";

const useGetCourseForum = (page = 1, limit = 10, courseId) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.forumPosts);
  const currentCourseId = useSelector((state) => state.blog.currentCourse);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    hasFetched.current = false;
  }, [courseId]);

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
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setForumPost(response.data.data)); // Asegurate de que sea un array
        dispatch(setCurrentCourse(courseId));
        hasFetched.current = true;
        setSuccess(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al obtener las publicaciones');
      } finally {
        setLoading(false);
      }
    };

    if (courseId && !hasFetched.current && currentCourseId !== courseId) {
      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [courseId, currentCourseId, page, limit]);

  return { posts, loading, error, success };
};


export default useGetCourseForum;

