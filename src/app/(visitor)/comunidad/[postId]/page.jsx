'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';
import PostDetail from "@/app/components/PostDetail";

const Page = () => {

  const params = useParams()
  const paramsId = params.postId;

  const [post, setPost] = useState(null); // ⬅️ Aca guardás el resultado

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
      setPost(data?.data); // ⬅️ Guardo en el estado
    };

    if (paramsId) {
      getPostData();
    }
  }, [paramsId]);

  return (
    <div>
      {post ? (
        <PostDetail key={post?.id} data={post}/>
      ) : (
        <div>Cargando publicación...</div>
      )}
    </div>
  );
}

export default Page;
