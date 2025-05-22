"use client";

import Checkout from "@/app/components/Checkout";
import { useValidateCheckout } from "../../../../../../hooks/useValidateCheckout";
import { useParams } from "next/navigation";

const Page = () => {
  const {courseName} = useParams();

  const formattedSlug = courseName.replace(/-/g, " "); 

  const { item, loading, error, success } = useValidateCheckout(formattedSlug);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Checkout item={item}/>
    </div>
  );
};

export default Page;
