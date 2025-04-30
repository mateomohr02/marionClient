'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';
import PostDetail from "@/app/components/PostDetail";
import { useGetComments } from "../../../../../hooks/useGetComments";

const Page = () => {

  const params = useParams()
  const paramsId = params.postId;

  const [post, setPost] = useState(null); // ⬅️ Aca guardás el resultado
  const [comments, setComments] = useState(null);

  const fetchPost = async (postId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/get-post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data;

    } catch (error) {
      console.log(error.message, 'error al obtener la información');
    }
  }

  useEffect(() => {
    const getPostData = async () => {
      const data = await fetchPost(paramsId);
      const comments = await useGetComments(paramsId)
      setPost(data?.data); // ⬅️ Guardo en el estado
      setComments(comments?.data);
    };

    if (paramsId) {
      getPostData();
    }
  }, [paramsId]);

  return (
    <div>
      {post ? (
        <>
        <PostDetail key={post?.id} data={post} comments={comments}/>
        </>
      ) : (
        <div>Cargando publicación...</div>
      )}
    </div>
  );
}

export default Page;
