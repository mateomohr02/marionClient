import axios from "axios";

export const useAddComment = (postId, parentId = null, content) => {
  const response = axios.post(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/add-comment/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      parentId,
      content,
    }
  );

  if (response.status !== 'success') {
    console.log('Error al añadir comentario');
    return "error";
  }

  console.log(response, 'Respuestaaa');
  
  return response;
};
