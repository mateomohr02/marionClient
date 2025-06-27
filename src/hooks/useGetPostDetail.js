import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostDetail,
  setCurrentPost
} from "@/redux/slices/blogSlice";
import { useLocale } from "next-intl";
import slugify from "@/utils/slugify";


const useGetPostDetail = (postSlug, courseName = null, { messages } = {}) => {
  const dispatch = useDispatch();
  const locale = useLocale();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const postDetail = useSelector((state) => state.blog.postDetail);
  const currentPostId = useSelector((state) => state.blog.currentPost);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");

      let formattedCourseName;

      courseName ? formattedCourseName = slugify(courseName) : null;

      const formattedPostSlug = slugify(postSlug);     

      const route = courseName
        ? `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/forum/${formattedCourseName}/${formattedPostSlug}?lang=${locale}`
        : `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/get-post/${formattedPostSlug}`;

      try {
        const response = await axios.get(route, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setPostDetail(response.data.data));
        dispatch(setCurrentPost(postSlug));
        hasFetched.current = true;
      } catch (err) {
        if (err.response?.status === 404) {
          setError(messages?.notFound || "Publicación no encontrada.");
        } else {
          setError(messages?.serverError || "Error al obtener la publicación.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (
      postSlug &&
      !hasFetched.current &&
      (currentPostId !== postSlug || !postDetail || Object.keys(postDetail).length === 0)
    ) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [postSlug, courseName, currentPostId, postDetail, locale, messages]);

  return { post: postDetail, loading, error };
};

export default useGetPostDetail;
