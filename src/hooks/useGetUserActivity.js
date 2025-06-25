import { useState } from 'react';
import axios from 'axios';

const useGetUserActivity = () => {
  const [userActivity, setUserActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserActivity = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== "undefined" && localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserActivity(res.data.data.user);
    } catch (err) {
      console.error("Error al obtener actividad del usuario:", err);
      setError("Error al obtener actividad del usuario.");
    } finally {
      setLoading(false);
    }
  };

  return { userActivity, loading, error, fetchUserActivity };
};

export default useGetUserActivity;
