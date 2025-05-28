'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRegister } from '../../../hooks/register';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const { register, loading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const userSend = {
      name: name + " " + lastName,
      email,
      password,
      userType: '1',
    };

    const user = await register(userSend);

    if (user) {
      alert('Usuario Creado con Éxito');
      router.push('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)] px-4 my-10">
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-poppins mb-1">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-poppins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 font-poppins mb-1">
                Apellido
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Apellido"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-poppins"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-poppins mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresar Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-poppins"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-poppins mb-1">
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

          <div className="mb-6">
            <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700 font-poppins mb-1">
              Repetir Contraseña
            </label>
            <input
              id="repeatPassword"
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-poppins"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-center font-poppins font-medium mb-4">
              {error}
            </p>
          )}

          <div className="relative w-1/2 mx-auto group mt-4">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 blur-sm opacity-70 group-hover:blur-md group-hover:opacity-90 transition-all duration-500 rounded-md" />
            <button
              type="submit"
              disabled={loading}
              className="relative z-10 w-full inline-block px-10 py-3 bg-snow/90 hover:bg-snow text-base font-bold font-poppins rounded-md backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 ease-in-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
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
    </div>
  );
}
