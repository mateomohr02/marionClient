import axios from "axios";

const useGetUserActivity = async (userId) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data.data, 'res.data.data');
    
    return res.data.data.user;
  } catch (err) {
    console.error("Error al obtener actividad del usuario:", err);
    throw err;
  }
};

export default useGetUserActivity;
