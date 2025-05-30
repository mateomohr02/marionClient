'use client'

import { useParams } from "next/navigation";
import PostDetail from "@/app/components/PostDetail";
import useGetPostDetail from "../../../../../hooks/useGetPostDetail";
import Loading from "@/app/components/Loading";


const Page = () => {
  const { postId } = useParams();
  const { post, loading } = useGetPostDetail(postId); // solo blog
 
  return (
    <div
    
    >
      {loading ? (
        <Loading/>
      ) : (
        <PostDetail key={post?.id} data={post} />
      )}
    </div>
  );
};

export default Page;
