'use client'

import { useParams } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import useGetPostDetail from "@/hooks/useGetPostDetail";
import Loading from "@/components/Loading";



const Page = () => {
  const { postId, courseId } = useParams();

  const { post, loading } = useGetPostDetail(postId, courseId); // solo blog

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        
        <PostDetail key={post?.id} data={post} />
      )}
    </div>
  );
};

export default Page;