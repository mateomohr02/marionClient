import { useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async ( email, password ) => {
    setLoading(true);
    setError(null);

    try {

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/login`, {
        email,
        password,
      });      

      const token = res.data.data.token;
      const userData = res.data.data.userData;

      // Guardar el token en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      return res.data; // Podés devolver user info si está en el response

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Credenciales incorrectas");
      } else {
        setError("Error de red o del servidor");
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
