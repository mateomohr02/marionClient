"use client";

import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Checkout = ({ item }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuy = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/mercado-pago/create-preference-id`,
        {
          title: item.name,
          unit_price: item.price,
          quantity: 1,
          courseId: item.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { init_point } = response.data;
      window.location.href = init_point;
    } catch (err) {
      console.error("Error:", err);
      setError("Hubo un error al iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="flex flex-col md:flex-row p-1 gap-1 max-w-screen-xl min-h-[calc(100vh-31rem)] mx-auto bg-gradient-to-br from-gradientLeft to-gradientRight rounded-[0.75rem] my-4">
      {/* Columna izquierda - Información del curso */}
      <div className="flex-1 bg-snow/75 rounded-lg p-6 shadow-md">
        <Link
          href={`/cursos/${item.name.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-sm hover:underline"
        >
          <div className="flex items-center">
            <ArrowLeft className="p-1" />
            Detalle del Curso
          </div>
        </Link>
        <div className="flex">
          {/* Texto */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold mt-2 text-gray-800">
              {item.name}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed text-justify mt-2">
              {item.description}
            </p>
          </div>

          {/* Imagen */}
          <div className="ml-6 w-2/5">
            <img
              src={item.poster}
              alt="Imagen de portada del curso"
              className="h-full w-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Columna derecha - Resumen de compra */}
      <div className="w-full md:w-[350px] bg-snow/75 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Resumen de compra
        </h3>

        <div className="flex justify-between mb-2 text-gray-600">
          <span>Producto</span>
          <span className="font-medium">{item.name}</span>
        </div>

        <div className="flex justify-between mb-6 text-gray-600">
          <span>Precio</span>
          <span className="font-semibold text-gray-800">${item.price}</span>
        </div>

        <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
          <span>Total</span>
          <span>${item.price}</span>
        </div>

        <button
          onClick={handleBuy}
          disabled={loading}
          className="relative w-full inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group disabled:opacity-50"
        >
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />

          {/* Contenido del botón */}
          <span className="relative z-10 flex items-center justify-center w-full px-6 py-3 bg-snow/90 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
            Comprar ahora
          </span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
