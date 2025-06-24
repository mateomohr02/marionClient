import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { setUsers, setUserActivity, deleteUser } from "@/redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import UserPosts from "./UserPosts";
import useGetUserActivity from "@/hooks/useGetUserActivity";

const usePaginatedUsers = (page, limit = 10) => {
  const dispatch = useDispatch();
  const [qUsers, setqUsers] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setqUsers(res.data.data.length);
        dispatch(setUsers(res.data.data));
        setTotalPages(res.data.pagination.totalPages);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, dispatch]);

  return { totalPages, qUsers, loading };
};

const UsersManager = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { totalPages, qUsers, loading } = usePaginatedUsers(page);
  const users = useSelector((state) => state.admin.users);
  const activity = useSelector((state) => state.admin.activity);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activityLoading, setActivityLoading] = useState(false);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const handleSync = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/sync`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error al Sincronizar", error);
      alert("Error Sincronizar");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(deleteUser(id));
      alert("Usuario eliminado");
      if (selectedUserId === id) setSelectedUserId(null);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Error al eliminar el usuario");
    }
  };

  const handleUserActivityDisplay = async (userId) => {
    setSelectedUserId(userId);
    setActivityLoading(true);
    try {
      const data = await useGetUserActivity(userId);
      dispatch(setUserActivity(data));
    } catch (err) {
      console.error("Error fetching user activity:", err);
    } finally {
      setActivityLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between items-center py-2">
            <p className="text-xl px-2 mb-2">
              Cantidad de Usuarios Totales: <span className="font-bold">{qUsers}</span>
            </p>
            <button
              onClick={() => handleSync()}
              className="inline-block rounded-full bg-blue-700 text-white py-2 px-4 font-medium"
            >
              Sincronizar Administradores
            </button>
          </div>
          <div className="bg-gradient-to-br from-gradientLeft to bg-gradientRight p-1 rounded-[0.75rem]">
            <table className="min-w-full overflow-hidden bg-snow/70 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 w-1/6 text-start px-4">Nombre</th>
                  <th className="py-2 w-1/6 text-start px-4">Email</th>
                  <th className="py-2 w-1/6 text-start px-4">Cursos</th>
                  <th className="py-2 w-full">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gradientRight/40">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">
                      {user.userType === "0" ? (
                        <span className="text-gray-600 italic">Administrador</span>
                      ) : user.Courses && user.Courses.length > 0 ? (
                        <ul className="list-disc pl-4">
                          {user.Courses.map((course) => (
                            <li key={course.id}>{course.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-600 italic">Sin cursos</span>
                      )}
                    </td>
                    <td className="space-x-2 items-center py-2">
                      <button
                        onClick={() => handleUserActivityDisplay(user.id)}
                        className="inline-block rounded-full bg-white/60 text-black py-2 px-4 font-medium"
                      >
                        Ver Publicaciones
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="inline-block rounded-full bg-red-600 text-white py-2 px-4 font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-3 py-1">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {selectedUserId && (
        <div className="mt-6">
          {activityLoading ? <Loading /> : <UserPosts activity={activity} />}
        </div>
      )}
    </div>
  );
};

export default UsersManager;