import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="h-32 w-full top-0 left-0 z-50 flex items-center justify-center backdrop-blur-md shadow-md before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-gradientLeft after:to-gradientRight">
      <div className="w-2/3 flex items-center justify-between">
        <NavLink href="/" label="Inicio" />
        <NavLink href="/cursos" label="Descubre Cursos" />
        <NavLink href="/comunidad" label="Noticias y Comunidad" />
        <NavLink href="/areaPersonal" label="Mi Aprendizaje" />
      </div>
    </div>
  );
};

const NavLink = ({ href, label }) => (
  <Link
    href={href}
    className="font-dancing text-3xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0"
  >
    {label}
  </Link>
);

export default NavBar;
