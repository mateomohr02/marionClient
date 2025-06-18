"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useLogin.js";
import { motion } from "framer-motion";
import { validateLoginForm } from "@/utils/validationRegLogForms.js";
import { showAlert } from "@/redux/slices/alertSlice.js";
import { useDispatch } from "react-redux";
import { Eye, EyeClosed } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { login, error, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateLoginForm({ email, password });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({}); // Limpiar errores anteriores

    const user = await login(email, password);
    if (user) router.push("/areaPersonal");
  };

  // Mostrar alerta si hay error de autenticación
  useEffect(() => {
    if (error) {
      dispatch(
        showAlert("No se ha podido iniciar sesión. Inténtalo nuevamente.")
      );
    }
  }, [error, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-center min-h-[calc(100vh-20rem)] px-4"
    >
      <div className="max-w-[calc(24rem+2px)] bg-gradient-to-br from-gradientLeft to-gradientRight rounded-[1rem] p-1">
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-xl w-[calc(24rem-1rem)] bg-pastelPink/70"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 font-poppins">
            Iniciar Sesión
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 font-poppins mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              }`}
              value={email}
              placeholder="Ingresar Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 font-poppins mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${
                formErrors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              }`}
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          <div className="relative w-full mx-auto group mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
            <button
              type="submit"
              disabled={loading}
              className="relative z-10 w-full inline-block px-10 py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </button>
          </div>

          <div className="text-center mt-4 font-poppins text-gray-700">
            <span className="my-4">¿No tienes una cuenta?</span>
            <div className="relative w-full mx-auto group mt-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
              <Link
                href="/register"
                className="relative z-10 block w-full text-center px-10 py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out no-underline"
              >
                Regístrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
