import { useEffect, useState } from "react";
import axios from "axios";

const useGetPostDetail = (postId, courseId = null) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      setLoading(true);
      const token = localStorage.getItem("token");

      const route = courseId
        ? `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/forum/${courseId}/${postId}`
        : `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/get-post/${postId}`;

      try {
        const response = await axios.get(route, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPost(response.data?.data);
      } catch (error) {
        console.error("Error al obtener el post:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, courseId]);

  return { post, loading };
};

export default useGetPostDetail;
