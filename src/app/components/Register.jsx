"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRegister } from "../../../hooks/register";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { validateRegisterForm } from "../../../utils/validationRegLogForms.js";
import { showAlert } from "../../../redux/slices/alertSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeClosed } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { register, loading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formValues = { name, lastName, email, password, repeatPassword };
    const errors = validateRegisterForm(formValues);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const userSend = {
      name: `${name} ${lastName}`,
      email,
      password,
    };

    const user = await register(userSend);

    if (user) {
      dispatch(showAlert("Usuario creado con éxito 🙂"));
      router.push("/login");
    } else {
      dispatch(showAlert("Error al crear el usuario 😕"));
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(showAlert("No se pudo crear el usuario. Intenta nuevamente."));
    }
  }, [error, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-center min-h-[calc(100vh-20rem)] px-4 my-10"
    >
      <div className="w-full max-w-[calc(50vw+2px)] bg-gradient-to-br from-gradientLeft to-gradientRight rounded-[1rem] p-1">
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-xl w-full bg-pastelPink/70"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 font-poppins">
            Registrarse
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 font-poppins mb-1"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${
                  formErrors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 font-poppins mb-1"
              >
                Apellido
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Apellido"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${
                  formErrors.lastName
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

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
              placeholder="Ingresar Email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 font-poppins mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${
                formErrors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeClosed/> : <Eye/>}
            </button>
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-medium text-gray-700 font-poppins mb-1"
            >
              Repetir Contraseña
            </label>
            <input
              id="repeatPassword"
              type={showRepeatPassword ? "text" : "password"}
              placeholder="********"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 font-poppins ${
                formErrors.repeatPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
              }`}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-3 top-9 text-sm text-gray-600 hover:text-gray-800"
            >
              {showRepeatPassword ? "Ocultar" : "Ver"}
            </button>
            {formErrors.repeatPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.repeatPassword}
              </p>
            )}
          </div>

          <div className="relative w-1/2 mx-auto group mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
            <button
              type="submit"
              disabled={loading}
              className="relative z-10 w-full inline-block px-10 py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </div>

          <p className="text-center mt-4 text-gray-700 font-poppins">
            ¿Ya tienes una cuenta?
          </p>
          <div className="relative w-1/2 mx-auto group mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
            <Link
              href="/login"
              className="relative z-10 block w-full text-center px-10 py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out no-underline"
            >
              Iniciar Sesión
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
