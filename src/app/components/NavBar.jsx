import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="h-32 w-full flex items-center justify-center relative before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-gradientLeft after:to-gradientRight">
      <div className="w-2/3 flex items-center justify-between">
        <Link
          href="/"
          className="font-dancing text-3xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0"
        >
          Inicio
        </Link>

        <Link
          href="/cursos"
          className="font-dancing text-3xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0"
        >
          Descubre Cursos
        </Link>

        <Link
          href="/comunidad"
          className="font-dancing text-3xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0"
        >
          Noticias y Comunidad
        </Link>

        <Link
          href="/areaPersonal"
          className="font-dancing text-3xl text-gradient relative before:absolute before:left-1/2 before:bottom-0 before:h-[2px] before:w-0 before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight before:transition-all before:duration-300 before:ease-out hover:before:w-full hover:before:left-0"
        >
          Mi Aprendizaje
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
