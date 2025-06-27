"use client";

import Checkout from "@/components/Checkout";
import { useValidateCheckout } from "@/hooks/useValidateCheckout";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useLocale } from "next-intl";

const Page = () => {
  const locale = useLocale()

  const { courseName } = useParams();

  const { item, loading, error } = useValidateCheckout(courseName, locale);

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