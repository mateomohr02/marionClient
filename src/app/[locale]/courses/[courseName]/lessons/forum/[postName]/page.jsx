'use client'

import { useParams } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import useGetPostDetail from "@/hooks/useGetPostDetail";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";

const page = () => {

  const t = useTranslations("Blog")

  const { postName, courseName } = useParams();

  const { post, loading } = useGetPostDetail(postName, courseName, { messages: {
    notFound:t("Hook.NotFound"),
    serverError:t("Hook.ServerError")
  }});

  console.log(post);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        
        <PostDetail key={post?.id} data={post} courseName={courseName}/>
      )}
    </div>
  );
};

export default page;