import axios from "axios";

export const useAddComment = () => {
  const addComment = async ({ postId, parentId = null, content, token }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/add-comment/${postId}`,
        { parentId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status !== "success" || !response.data.data) {
        console.error("Error al añadir comentario:", response.data);
        return { success: false };
      }

      return { success: true, newComment: response.data.data };
    } catch (error) {
      console.error("Error al añadir comentario:", error);
      return { success: false };
    }
  };

  return { addComment };
};
