import { useState } from "react";
import axios from "axios";

export const useRegister = ({ messages }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/auth/signup`,
        { name, email, password }
      );

      if (res.status === 201) {
        return {
          status: "success",
          message: messages.success || "Registro exitoso",
        };
      } else {
        setError(messages.register);
        return null;
      }

    } catch (err) {
if (err.response) {
        const status = err.response.status;

        if (status === 409) {
          setError(messages.emailConflict);
        } else if (status === 400) {
          setError(messages.invalidFields);
        } else {
          setError(messages.register);
        }

      } else {
        // error de red (timeout, DNS, conexión)
        setError(messages.network);
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};


