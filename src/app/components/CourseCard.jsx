import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const CourseCard = ({ course, index }) => {
  const pathname = usePathname();
  const courseSlug = course.name.replace(/\s+/g, "-");

  console.log(course, "cursooo");

  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center p-8">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-30"></div>

        {/* Contenido en fila */}
        <div className="relative flex gap-8 items-start z-10 max-w-6xl w-full">
          {/* Imagen */}
          <div className="w-[275px] h-[275px] relative flex-shrink-0 overflow-hidden rounded-lg shadow-md">
            <Image
              src={course.poster}
              alt={`Imagen del curso ${course.name}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Bloque de texto */}
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
                <Link href={`${pathname}/${courseSlug}`}>
                  <span className="text-blue-600 hover:underline ml-1 font-poppins">
                    Ver Más
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <Link
                href={`${pathname}/${courseSlug}`}
                className="px-4 py-2 bg-pastelPink rounded-2xl hover:shadow-md text-black font-semibold font-poppins hover:bg-snow transition-all ease-in-out duration-300"
              >
                Obtener Acceso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
