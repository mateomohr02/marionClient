import { useState } from "react";
import axios from "axios";

const useTranslate = () => {
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState(null);
  const [error, setError] = useState(null);

  const translate = async (value) => {

    console.log(value, 'Valor a traducir en hook');
    
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/deepseek/translate`,
        { text: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        setTranslation(response.data.data);
      } else {
        setError(response.data.message || "Error en la traducción");
      }
    } catch (err) {
      setError(err.message || "Error al obtener la traducción");
    } finally {
      setLoading(false);
    }
  };

  console.log(translation, 'Respuesta DeepSeek en hook');
  

  return { translation, loading, error, translate };
};

export default useTranslate;
