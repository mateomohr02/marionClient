import axios from 'axios';
import { useState } from 'react';

const useAddPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addPost = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');

      // Armar array de bloques desde el nuevo formato
      const content = formData.blocks.map((block) => ({
        contentType: block.type,
        value: block.value,
      }));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/add-post`,
        {
          title: formData.title,
          content,
        },
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
