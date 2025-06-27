import axios from 'axios';
import { useState } from 'react';
import { useLocale } from 'next-intl';

const useAddPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const locale = useLocale();

  const addPost = async (formData, courseName = null) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    console.log(formData, "DATA CURSO", courseName ? courseName : "no recibe", "PROBANDO HOOK" );
    

    try {
      const token = localStorage.getItem('token');

      const content = formData.content.map((c) => ({
        contentType: c.contentType,
        value: c.value,
      }));

      const endpoint = courseName
        ? `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/forum/${courseName}?lang=${locale}`
        : `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/add-post`;

      const response = await axios.post(
        endpoint,
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
