"use client";

import { useParams } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import useGetPostDetail from "@/hooks/useGetPostDetail";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useTranslations } from "next-intl";

const PostDetailPage = () => {

  const t = useTranslations("Blog")

  const { postName } = useParams();

  const { post, loading, error } = useGetPostDetail(postName, null, {
    messages: {
      notFound: t("Hook.NotFound"),
      serverError: t("Hook.ServerError")
    },
  });  

  if (loading) return <Loading />;
  if (error) return <Error msj={error} />;

  return <PostDetail key={post?.id} data={post} />;
};

export default PostDetailPage;
