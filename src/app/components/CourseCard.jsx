import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSetCourseDetail } from "../../../hooks/useSetCourseDetail";

const CourseCard = ({ course, index }) => {
  const pathname = usePathname();
  const courseSlug = course.name.replace(/\s+/g, "-");
  const setCourseDetail = useSetCourseDetail();

  const handleClick = () => {
    setCourseDetail(course);
  };

  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center p-6 sm:p-8 overflow-hidden shadow-lg bg-white/60 backdrop-blur-md">
        {/* Fondo degradado suave */}
        <div className="absolute inset-0 bg-gradient-to-l from-gradientRight to-gradientLeft opacity-25" />

        {/* Contenido */}
        <div className="relative flex flex-col md:flex-row gap-8 items-start z-10 max-w-6xl w-full">
          {/* Imagen */}
          <div className="w-full md:w-[275px] h-[275px] relative flex-shrink-0 overflow-hidden shadow-md">
            <Image
              src={course.poster}
              alt={`Imagen del curso ${course.name}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-between h-full text-black max-w-3xl w-full">
            <div>
              <h2 className="text-3xl font-bold font-poppins">
                {course.name}
              </h2>
              <p className="mt-2 text-lg font-poppins">
                Idiomas disponibles:{" "}
                <span className="font-semibold ">
                  Español - Alemán
                </span>
              </p>
              <p className="mt-3 text-base text-justify leading-relaxed font-poppins ">
                {course.description.slice(0, 490)}...
                <Link href={`${pathname}/${courseSlug}`}>
                  <span className="text-primary hover:underline ml-1 font-semibold">
                    Ver Más
                  </span>
                </Link>
              </p>
            </div>

            {/* Botón */}
            <div className="mt-6">
              <Link
                href={`${pathname}/${courseSlug}`}
                onClick={handleClick}
                className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
              >
                {/* Fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />

                {/* Contenido del botón */}
                <span className="relative z-10 px-6 py-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
                  🎓 Ver Clase Gratuita
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
