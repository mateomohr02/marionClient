const { default: axios } = require("axios")

export const useGetComments = async (postId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/get-post-comments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;

    } catch (error) {
      console.log(error.message, 'Error al obtener los comentarios');
    }
  }