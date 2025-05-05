import axios from "axios";

export const useGetUserCourses = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/get-user-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // <-- ¡Devuelve los datos!
  } catch (error) {
    console.error("Error al obtener la información:", error.message);
    return null;
  }
};
