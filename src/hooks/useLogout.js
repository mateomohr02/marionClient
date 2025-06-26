import { useState } from "react";

export const useLogout = ({ messages }) => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const logout = () => {
    setLoading(true);
    setError(null);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setLoading(false);
      return {
        status: "success",
        message: messages.success || "Logout successful",
      };

    } catch (err) {
      setLoading(false);
      setError(messages.error || "Logout failed");
      return {
        status: "error",
        message: messages.error || "Logout failed",
      };
    }
  };

  return { logout, loading, error};
};
