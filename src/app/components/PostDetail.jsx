import Link from "next/link";
import { Undo2 } from "lucide-react";
import CommentSection from "./CommentSection";
import FormAddComment from "./FormAddComment";

const PostDetail = ({ data }) => {
  return (
    <div className="mt-6 rounded-2xl relative max-w-[calc(60vw)] mx-auto p-6">
      
      {/* Fondo degradado con opacidad */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gradientRight to-gradientLeft opacity-30"></div>

      {/* Contenido por encima del fondo */}
      <div className="relative z-10 space-y-6">

        {/* Contenedor del botón y título */}
        <div className="flex items-center justify-between mb-6">
          
          {/* Botón de volver */}
          <Link
            href="/comunidad"
            className="flex items-center gap-2 bg-pastelPink text-black font-semibold font-poppins p-2 rounded-full hover:shadow-md hover:bg-snow transition-all ease-in-out duration-300"
          >
            <Undo2 size={25} />
          </Link>

          {/* Título */}
          <h2 className="flex-1 text-3xl font-bold text-center text-black">
            {data?.title}
          </h2>

          {/* Espacio invisible para balancear el layout */}
          <div className="w-[90px]"></div>

        </div>

        {/* Contenido dinámico */}
        {data?.content?.map((cont, index) => {
          if (cont.contentType === "text") {
            return (
              <p key={index} className="text-base text-gray-800 leading-relaxed">
                {cont.value}
              </p>
            );
          } else if (cont.contentType === "image") {
            return (
              <img
                key={index}
                src={cont.value}
                alt={`Imagen-${index}`}
                className="w-full rounded-lg object-cover"
              />
            );
          } else if (cont.contentType === "video") {
            return (
              <div key={index} className="aspect-video">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={cont.value.replace("watch?v=", "embed/").split("&")[0]}
                  title={`Video-${index}`}
                  allowFullScreen
                />
              </div>
            );
          } else {
            return (
              <div key={index} className="text-red-500 text-center">
                Error al obtener el contenido de la publicación
              </div>
            );
          }
        })}
        <div className="bg-pastelPink/70 rounded-2xl p-4">
        <h3 className="text-2xl font-poppins">Comentarios</h3>
        <span></span>
          <FormAddComment postId={data?.id}/>
          <CommentSection data={data?.Replies}/>
        </div>
      </div>

    </div>
  );
};

export default PostDetail;
