"use client";

import FormAddPostForum from "@/components/FormAddPostForum";
import useGetCourseForum from "@/hooks/useGetCourseForum";
import PostCard from "@/components/PostCard";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";
import Error from "@/components/Error";

const Page = () => {
  const params = useParams();
  
  const t = useTranslations("Lessons");

  const { courseName } = params;

  const page = 1;
  const limit = 10;

  const { posts, loading, error } = useGetCourseForum(
    page,
    limit,
    courseName,
    { messages: {
      NoPosts:t("Hook.NoPosts"),
      ServerError:t("Hook.ServerError")
    }}
  );

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {loading && <Loading />}
      {error && <Error msj={error}/>}

      {/* Crear CTA PARA NO POSTS */}
      {!loading && posts.length === 0 && <p className="text-center mt-6 font-poppins">{t("Forum.NoPosts")}</p>} 
      <FormAddPostForum courseName={courseName} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} courseName={courseName}/>
      ))}
    </div>
  );
};

export default Page;
