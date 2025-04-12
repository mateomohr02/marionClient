import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async ({ name, email, password}) => {
    setLoading(true);
    setError(null);

    console.log(name, email, password, 'DATA QUE LLEGA A LA ACTION');
    
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/signup`, {
        name,
        email,
        password,
      });

      const token = res.data.data.token;
      const userData = res.data.data;

      // Guardar token y data del usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));

      return userData;
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

