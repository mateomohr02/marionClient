import { useState } from "react";
import axios from "axios";

export const useAuth = ({ messages }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/login`,
        { email, password }
      );

      const { token, userData } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      return res.data;
    } catch (err) {
      if (err.response) {
        const status = err.response.status;

        if (status === 401) {
          setError(messages.invalidCredentials || "Credenciales inválidas");
        } else if (status === 400) {
          setError(messages.missingFields || "Campos requeridos faltantes");
        } else {
          setError(messages.network || "Error de red o del servidor");
        }
      } else {
        setError(messages.network || "Error de red o del servidor");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { login, logout, loading, error };
};
