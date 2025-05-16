'use client'

import { useParams } from "next/navigation";
import PostDetail from "@/app/components/PostDetail";
import useGetPostDetail from "../../../../../../../hooks/useGetPostDetail";

const Page = () => {
  const { postId, courseId } = useParams();

  const { post, loading } = useGetPostDetail(postId, courseId); // solo blog

  return (
    <div>
      {loading ? (
        <div className="h-screen"></div>
      ) : (
        <PostDetail key={post?.id} data={post} />
      )}
    </div>
  );
};

export default Page;