"use client";

import Checkout from "@/app/components/Checkout";
import { useValidateCheckout } from "../../../../../../hooks/useValidateCheckout";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";

const Page = () => {
  const {courseName} = useParams();

  const formattedSlug = courseName.replace(/-/g, " "); 

  const { item, loading, error, success } = useValidateCheckout(formattedSlug);

  if (loading) return <Loading/>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Checkout item={item}/>
    </div>
  );
};

export default Page;
