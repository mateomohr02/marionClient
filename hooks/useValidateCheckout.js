// hooks/useValidateCheckout.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useValidateCheckout = (itemName) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // redirigir si no está autenticado
        return;
      }     

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/get-course-by-name?name=${itemName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, 'responsessssesees');
        
        setItem(response.data.course);
        setSuccess(true);
      } catch (err) {
        setError("Curso no encontrado o error de autenticación.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [itemName]);

  return { item, loading, error, success };
};

