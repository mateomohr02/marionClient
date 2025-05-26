"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Checkout = ({ item }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!window.MercadoPago) {
          await loadMercadoPagoSDK();
        }

        const response = await axios.post(
          "https://marionapi-production.up.railway.app/api/mercado-pago/create-preference-id",
          {
            title: item.name,
            unit_price: item.price,
            quantity: 1,
            courseId: item.id
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const preferenceId = response.data.preferenceId;

        const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_KEY_MP, {
          locale: "es-AR",
        });

        mp.checkout({
          preference: {
            id: preferenceId,
          },
          autoOpen: true,
          onClose: () => {
            router.push(
              `/cursos/${item.name.replace(/\s+/g, "-").toLowerCase()}`
            );
          },
        });
      } catch (err) {
        console.error("Error:", err);
        setError("Hubo un error al inicializar el checkout.");
      } finally {
        setLoading(false);
      }
    };

    initCheckout();
  }, [item, router]);

  const loadMercadoPagoSDK = () => {
    return new Promise((resolve, reject) => {
      if (
        document.querySelector(
          "script[src='https://sdk.mercadopago.com/js/v2']"
        )
      ) {
        const interval = setInterval(() => {
          if (window.MercadoPago) {
            clearInterval(interval);
            resolve();
          }
        }, 50);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className=" -translate-y-32 relative w-fit mx-auto group mt-2">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 rounded-full blur-md opacity-80 group-hover:blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse scale-105" />
        <Link href={`/cursos/${item.name.replace(/\s+/g, "-").toLowerCase()}`}>
          <span className="relative z-10 inline-block px-12 py-5 bg-white/90 hover:bg-white text-xl font-semibold text-gray-900 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer no-underline">
            Regresar a la presentación del curso: {`${item.name}`}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
