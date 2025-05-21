"use client";

import { useValidateCheckout } from "../../../../../../hooks/useValidateCheckout";
import { useParams } from "next/navigation";

const Page = () => {
  const {courseName} = useParams(); // Ej: "Parto-Suave"

  const formattedSlug = courseName.replace(/-/g, " "); // Ej: "Parto Suave"

    console.log(formattedSlug, 'slug');
    

  const { item, loading, error, success } = useValidateCheckout(formattedSlug);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="mt-2">{item.description}</p>
      <p className="mt-2">Precio: ${item.price}</p>
      {/* Aquí podrías renderizar el botón de pago */}
    </div>
  );
};

export default Page;
