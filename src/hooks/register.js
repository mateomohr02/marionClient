import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async ({ name, email, password}) => {
    setLoading(true);
    setError(null);

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/signup`, {
        name,
        email,
        password,
      });

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Error al registrarse");
      } else {
        setError("Error de red o del servidor");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

