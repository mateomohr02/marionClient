import axios from "axios";

export const useAddComment = async ({ postId, parentId = null, content}) => {
  try {

    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/add-comment/${postId}`,
      { parentId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status !== "success") {
      console.error("Error al añadir comentario:", response.data);
      return { error: true };
    }

    return { success: true };
  } catch (error) {
    console.error("Error al añadir comentario:", error);
    return { error: true };
  }
};
