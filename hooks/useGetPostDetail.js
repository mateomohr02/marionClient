import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostDetail,
  setCurrentPost
} from "../redux/slices/blogSlice";

const useGetPostDetail = (postId, courseId = null) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const postDetail = useSelector((state) => state.blog.postDetail);
  const currentPostId = useSelector((state) => state.blog.currentPost);

  useEffect(() => {
    const fetchPost = async () => {
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

        dispatch(setPostDetail(response.data.data));
        dispatch(setCurrentPost(postId));

        hasFetched.current = true;
      } catch (err) {
        console.error("Error al obtener el post:", err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (
      postId &&
      !hasFetched.current &&
      (currentPostId !== postId || !postDetail || Object.keys(postDetail).length === 0)
    ) {
      fetchPost();
    } else {
      setLoading(false); // ya había datos
    }
  }, [postId, courseId, currentPostId, postDetail]);

  return { post: postDetail, loading, error };
};

export default useGetPostDetail;
