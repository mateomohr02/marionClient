"use client";

import Checkout from "@/components/Checkout";
import { useValidateCheckout } from "@/hooks/useValidateCheckout";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";

const Page = () => {
  const { courseName } = useParams();
  const formattedSlug = courseName.replace(/-/g, " ");

  const { item, loading, error } = useValidateCheckout(formattedSlug);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  console.log(item);
  
  return (
    <div>
      <Checkout item={item} />
    </div>
  );
};

export default Page;