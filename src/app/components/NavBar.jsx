'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full top-0 left-0 z-50 shadow-md backdrop-blur-md relative bg-transparent">
      {/* Bordes arriba y abajo */}
      <div className="before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-gradientLeft after:to-gradientRight" />

      <div className="px-4 pt-4 lg:pt-0 flex justify-evenly h-16 lg:h-32">
        {/* Ícono hamburguesa (solo en móvil) */}
        <div className="lg:hidden">
          <button onClick={() => setVisible(!visible)} className="text-gradientLeft">
            {visible ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navegación en escritorio */}
        <div className="hidden lg:flex lg:w-[80%] lg:items-center lg:justify-between">
          <NavLink href="/" label="Inicio" />
          <NavLink href="/cursos" label="Descubre Cursos" />
          <NavLink href="/comunidad" label="Noticias y Comunidad" />
          <NavLink href="/areaPersonal" label="Mi Aprendizaje" />
        </div>
      </div>

      {/* Menú desplegable en móvil */}
      <div
        className={`lg:hidden flex flex-col gap-4 items-center px-6 transition-all duration-300 ease-in-out overflow-hidden ${
          visible ? 'max-h-96 pb-4 px-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <NavLinkMobile href="/" label="Inicio" onClick={() => setVisible(false)} />
        <NavLinkMobile href="/cursos" label="Descubre Cursos" onClick={() => setVisible(false)} />
        <NavLinkMobile href="/comunidad" label="Noticias y Comunidad" onClick={() => setVisible(false)} />
        <NavLinkMobile href="/areaPersonal" label="Mi Aprendizaje" onClick={() => setVisible(false)} />
      </div>
    </div>
  );
};

export default NavBar;

const NavLink = ({ href, label }) => (
  <Link
    href={href}
    className="font-dancing text-3xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0"
  >
    {label}
  </Link>
);

const NavLinkMobile = ({ href, label, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="font-dancing text-2xl text-gradientLeft transition duration-200"
  >
    {label}
  </Link>
);
