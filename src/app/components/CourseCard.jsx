import Link from "next/link";
import React from "react";

const CourseCard = ({ course, index }) => {
  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center p-8">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-30"></div>

        {/* Contenido en fila */}
        <div className="relative flex gap-8 items-start z-10 max-w-6xl w-full">
          {/* Imagen */}
          <div className="w-[275px] h-[275px] bg-gray-300 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 text-lg">Imagen {index + 1}</span>
          </div>

          {/* Bloque de texto completo */}
          <div className="flex flex-col justify-between h-[250px] text-black max-w-3xl w-full">
            <div>
              <h2 className="text-2xl font-semibold font-poppins">
                {course.name}
              </h2>
              <p className="mt-2 text-xl font-poppins">
                Idiomas disponibles:{" "}
                <span className="font-semibold">Español - Alemán</span>
              </p>
              <p className="mt-2 text-base leading-relaxed break-words font-poppins">
                {course.description.slice(0, 490)} . . .
                <Link href={`/cursos`}>
                  <span className="text-blue-600 hover:underline ml-1 font-poppins">
                    Ver Más
                  </span>
                </Link>
              </p>
            </div>

            {/* Botón alineado a la parte inferior izquierda del bloque de texto */}
            <div className="mt-4">
              <button className="px-4 py-2 bg-pastelPink rounded-2xl hover:shadow-md text-black font-semibold font-poppins hover:bg-snow transition-all ease-in-out duration-300">
                Obtener Acceso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
