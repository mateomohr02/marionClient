"use client";

import FormAddPostForum from "@/app/components/FormAddPostForum";
import useGetCourseForum from "../../../../../../hooks/useGetCourseForum";
import PostCard from "../../../../components/PostCard";
import { useParams } from "next/navigation";
import Loading from "@/app/components/Loading";


const Page = () => {
  
    const params = useParams()

    const { courseId } = params;

  const page = 1;
  const limit = 10;

  const { posts, loading, error } = useGetCourseForum(page, limit, courseId);

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {loading && <Loading/>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && posts.length === 0 && (
        <p>No hay publicaciones disponibles.</p>
      )}
      <FormAddPostForum courseId={courseId}/>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;