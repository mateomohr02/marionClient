'use client'

import { useParams } from "next/navigation";
import PostDetail from "@/app/components/PostDetail";
import useGetPostDetail from "../../../../../hooks/useGetPostDetail";
import { useSelector } from "react-redux";

const Page = () => {
  const { postId } = useParams();
  const { post, loading } = useGetPostDetail(postId); // solo blog
 
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
