import axios from 'axios';
import { useState } from 'react';

const useAddPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addPost = async (postData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/posts/add-post`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar la publicación');
    } finally {
      setLoading(false);
    }
  };

  return { addPost, loading, error, success };
};

export default useAddPost;
