"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Checkout = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createPreferenceAndRedirect = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/mercado-pago/create-preference-id",
        {
          title: item.name,
          unit_price: item.price,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { init_point } = response.data;

      if (init_point) {
        // Redirige al checkout de Mercado Pago
        window.location.href = init_point;
      } else {
        throw new Error("No se recibió el link de pago");
      }
    } catch (err) {
      console.error("Error creando preferencia:", err);
      setError("Hubo un error al crear la preferencia de pago.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    createPreferenceAndRedirect();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return null; // Nunca llega acá si redirige correctamente
};

export default Checkout;
