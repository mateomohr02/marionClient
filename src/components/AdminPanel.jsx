'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  ListChecks,
  Users,
  List,
  PenLine,
} from 'lucide-react';
import FormAddCourse from './FormAddCourse';
import FormAddLesson from './FormAddLesson';
import FormAddPost from './FormAddPost';
import { useLogout } from '@/hooks/useLogout';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import UserInfo from './profile/UserInfo';
import UsersManager from './UsersManager';
import { useTranslations } from 'next-intl';
import { showAlert } from "@/redux/slices/alertSlice";

const AdminPanel = () => {

  const t = useTranslations("Profile")
  
  const [activeView, setActiveView] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const router = useRouter();
  const dispatch = useDispatch();


  const { logout, loading, error } = useLogout({
    messages: {
      success: t("AdminPanel.SuccessLogout"),
      error: t("AdminPanel.ErrorLogout"),
    },
  });

  const handleLogout = () => {
    const result = logout();
    if (result && result.status === "success") {
      router.push("/");
      dispatch(showAlert(result.message));
    } else {
      dispatch(showAlert(result.message || t("AdminPanel.ErrorLogout")));
    }
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };


  const renderContent = () => {
    switch (activeView) {
      case 'addCourse':
        return <FormAddCourse />;
      case 'addLesson':
        return <FormAddLesson />;
      case 'addPost':
        return <FormAddPost />;
      case 'seeCourses':
        return <UserInfo/>;
      case 'manageUsers':
        return <UsersManager/>;
      default:
        return <div className="text-gray-500 py-2 px-8">{t("AdminPanel.Placeholder")}</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra de navegación superior */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm relative">
        <h1 className="text-xl font-bold">{t("AdminPanel.Title")}</h1>
        <div className="flex gap-8 items-center">
          {/* BLOG */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('blog')}
              className="flex items-center gap-1 font-medium hover:text-blue-600"
            >
              {t("AdminPanel.btn1")} <ChevronDown size={16} />
            </button>
            {openDropdown === 'blog' && (
              <div className="absolute top-10 left-0 bg-white border rounded shadow-md z-10 min-w-max">
                <button
                  onClick={() => {
                    setActiveView('addPost');
                    setOpenDropdown(null);
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  <PenLine size={16} className="inline mr-2" />
                  {t("AdminPanel.btn1dd1")}
                </button>
              </div>
            )}
          </div>

          {/* EDUCACIÓN */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('educacion')}
              className="flex items-center gap-1 font-medium hover:text-blue-600"
            >
              {t("AdminPanel.btn2")} <ChevronDown size={16} />
            </button>
            {openDropdown === 'educacion' && (
              <div className="absolute top-10 left-0 bg-white border rounded shadow-md z-10 min-w-max">
                <button
                  onClick={() => {
                    setActiveView('addCourse');
                    setOpenDropdown(null);
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  <PlusCircle size={16} className="inline mr-2" />
                  {t("AdminPanel.btn2dd1")}
                </button>
                <button
                  onClick={() => {
                    setActiveView('addLesson');
                    setOpenDropdown(null);
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  <ListChecks size={16} className="inline mr-2" />
                  {t("AdminPanel.btn2dd2")}
                </button>
                <button
                  onClick={() => {
                    setActiveView('seeCourses');
                    setOpenDropdown(null);
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  <List size={16} className="inline mr-2" />
                  {t("AdminPanel.btn2dd3")}
                </button>
              </div>
            )}
          </div>

          {/* USUARIOS */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('usuarios')}
              className="flex items-center gap-1 font-medium hover:text-blue-600"
            >
             {t("AdminPanel.btn3")} <ChevronDown size={16} />
            </button>
            {openDropdown === 'usuarios' && (
              <div className="absolute top-10 left-0 bg-white border rounded shadow-md z-10 min-w-max">
                <button
                  onClick={() => {
                    setActiveView('manageUsers');
                    setOpenDropdown(null);
                  }}
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                >
                  <Users size={16} className="inline mr-2" />
                  {t("AdminPanel.btn3dd1")}
                </button>
              </div>
            )}
          </div>

          {/* CERRAR SESIÓN */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:underline"
          >
            <LogOut size={16} />
            {t("AdminPanel.LogOut")}
          </button>
        </div>
      </nav>

      {/* CONTENIDO */}
      <main className="flex-1 w-full mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
