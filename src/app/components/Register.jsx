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
      userType: '1', // Valor por defecto para usuario común
    };

    const user = await register(userSend);

    if (user) {
      alert('Usuario Creado con Éxito')
      router.push('/login');
    }
  };

  return (
    <div className="flex items-center justify-center my-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registrarse
        </h2>

        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <div className="flex-1 w-full">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nombre"
              />
            </div>
            <div className="flex-1 w-full">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                id="lastName"
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Apellido"
              />
            </div>
          </div>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresar Email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
            Repetir Contraseña
          </label>
          <input
            id="repeatPassword"
            type="password"
            placeholder="********"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="text-center mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-500 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
