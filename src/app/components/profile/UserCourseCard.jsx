import Link from "next/link";

const UserCourseCard = ({
  title,
  description,
  imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s",
  languages = "Español"
}) => {
  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center p-8">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-30"></div>

        {/* Contenido en fila */}
        <div className="relative flex gap-8 items-start z-10 max-w-6xl w-full">
          {/* Imagen */}
          <div className="w-[275px] h-[275px] bg-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img
              src={imageUrl}
              alt="Course Image"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-between h-[250px] text-black max-w-3xl w-full">
            <div>
              <h2 className="text-2xl font-semibold font-poppins">{title}</h2>
              <p className="mt-2 text-xl font-poppins">
                Idiomas disponibles: <span className="font-semibold">{languages}</span>
              </p>
              <p className="mt-2 text-base leading-relaxed break-words font-poppins">
                {description}
                <Link href={`/cursos`}>
                  <span className="text-blue-600 hover:underline ml-1 font-poppins">Ver Más...</span>
                </Link>
              </p>
            </div>

            {/* Botón */}
            <div className="mt-4">
              <button className="px-4 py-2 bg-pastelPink rounded-2xl hover:shadow-md text-black font-semibold font-poppins hover:bg-snow transition-all ease-in-out duration-300">
                Ir al Curso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCourseCard;
