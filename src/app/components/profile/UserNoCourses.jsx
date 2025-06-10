import Link from "next/link";
import { Book } from "lucide-react";
import { useLogout } from "../../../../hooks/useLogout";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const UserNoCourses = () => {
  const router = useRouter();

  const logout = () => {
    useLogout();
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-5 py-10 min-h-[calc(100vh-8rem)] -translate-y-20">
      <Book className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">
        Aún no formas parte de ningún curso
      </h2>
      <p className="mb-4 text-gray-600">
        Explora nuestros cursos y empieza a aprender hoy mismo.
      </p>

      <Link
        href={`/cursos`}
        className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
      >
        {/* Fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />

        {/* Contenido del botón */}
        <span className="relative z-10 flex items-center gap-2 px-6 py-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
          Ver Cursos Disponibles
        </span>
      </Link>
      <button
        onClick={() => logout()}
        className="flex items-center gap-2 text-left mt-4 hover:text-red-600 transition hover:rounded-full hover:bg-red-200 p-2 rounded-full hover:border-red-400 "
      >
        <LogOut className="w-5 h-5" />
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserNoCourses;
