"use client";

import FormAddPostForum from "@/components/FormAddPostForum";
import useGetCourseForum from "@/hooks/useGetCourseForum";
import PostCard from "@/components/PostCard";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";


const Page = () => {
  
    const params = useParams()
    
    const t = useTranslations("Lessons");

    const { courseId } = params;

  const page = 1;
  const limit = 10;

  const { posts, loading, error } = useGetCourseForum(page, limit, courseId);

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {loading && <Loading/>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && posts.length === 0 && (
        <p>{t("Forum.NoPosts")}</p>
      )}
      <FormAddPostForum courseId={courseId}/>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;