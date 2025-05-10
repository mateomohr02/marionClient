'use client';

import React, { useState } from 'react';
import { PlusCircle, ListChecks, Users, LogOut} from 'lucide-react';
import FormAddCourse from './FormAddCourse';
import FormAddLesson from './FormAddLesson';
import { useLogout } from '../../../hooks/useLogout';
import { useRouter } from 'next/navigation';
import FormAddPost from './FormAddPost';

const AdminPanel = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const Router = useRouter()

  const logout = () => {
    useLogout();
    Router.push('/')
  }

  const renderContent = () => {
    switch (activeView) {
      case 'addCourse':
        return <FormAddCourse/>;
        case 'addPost':
          return <FormAddPost/>;
      case 'addLesson':
        return <FormAddLesson/>;
      case 'manageUsers':
        return <div>Gestión de usuarios</div>;
      case 'logout':
        logout();
        return null;
      default:
        return <div>Seleccione en el panel de la izquierda la acción que desea realizar.</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Panel de administrador</h2>
        <nav className="flex flex-col gap-4">
          <hr />
          <h3 className='mx-auto text-lg font-medium'>Blog</h3>
        <button
            onClick={() => setActiveView('addPost')}
            className="flex items-center gap-2 text-left hover:text-blue-600 transition"
          >
            <ListChecks className="w-5 h-5" />
            Agregar Publicación
          </button>
          <hr />
          <h3 className='mx-auto text-lg font-medium'>Educación</h3>
          <button
            onClick={() => setActiveView('addCourse')}
            className="flex items-center gap-2 text-left hover:text-blue-600 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Agregar Curso
          </button>
          <button
            onClick={() => setActiveView('addLesson')}
            className="flex items-center gap-2 text-left hover:text-blue-600 transition"
          >
            <ListChecks className="w-5 h-5" />
            Agregar Clase
          </button>
          <hr />
          <h3 className='mx-auto text-lg font-medium'>Usuarios</h3>
          <button
            onClick={() => setActiveView('manageUsers')}
            className="flex items-center gap-2 text-left hover:text-blue-600 transition"
          >
            <Users className="w-5 h-5" />
            Gestionar Usuarios
          </button>
          <hr />
          <button
            onClick={() => setActiveView('logout')}
            className="flex items-center gap-2 text-left hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default AdminPanel;

