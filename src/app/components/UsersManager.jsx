import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Loading from "./Loading";
import { setUsers, deleteUser } from "../../../redux/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";

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
        dispatch(setUsers(res.data.data)); // ← Guardamos los usuarios en Redux
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
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const { totalPages, qUsers, loading } = usePaginatedUsers(page);
  const users = useSelector((state) => state.admin.users);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

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
    dispatch(deleteUser(id)); // 🔥 Eliminar del store inmediatamente
    alert("Usuario eliminado");
    // NO es necesario hacer setPage(1), porque ya actualizamos Redux
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    alert("Error al eliminar el usuario");
  }
};

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="text-xl px-2 mb-2">
            Cantidad de Usuarios Totales: <span className="font-bold">{qUsers}</span>
          </p>

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
                      {user.Courses && user.Courses.length > 0 ? (
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
                      <Link
                        href={`/admin/users/${user.id}/posts`}
                        className="inline-block rounded-full bg-white/60 text-black py-2 px-4 font-medium"
                      >
                        Ver Publicaciones
                      </Link>
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
    </div>
  );
};

export default UsersManager;

