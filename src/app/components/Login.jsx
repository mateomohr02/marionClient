"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useLogin.js";

export default function Login() {
  const Router = useRouter();
  const { login, error, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(email, password);

    if (user) {
      Router.push("/areaPersonal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)] px-4">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-poppins"
              value={email}
              placeholder="Ingresar Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 font-poppins mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-poppins"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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

          {error && (
            <p className="mt-4 text-center text-red-600 font-poppins font-medium">
              {error}
            </p>
          )}

          <div className="text-center mt-4 font-poppins text-gray-700">
            <span className="my-4">
            ¿No tienes una cuenta?
            </span>
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
    </div>
  );
}
