"use client";

import { Undo2 } from "lucide-react";
import CommentSection from "./CommentSection";
import FormAddComment from "./FormAddComment";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';


const PostDetail = ({ data }) => {
  const router = useRouter();

  return (
    <div className=" relative max-w-[calc(60vw)] mx-auto p-10">
      {/* Fondo degradado con opacidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradientRight to-gradientLeft  opacity-20"></div>

      {/* Contenido por encima del fondo */}
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-10 space-y-6">
        {/* Contenedor superior con título y botón */}
        <div className="flex justify-between items-center gap-5 mb-6">
          {/* Título y autor */}
          <button
            onClick={() => router.back()}
            className=" gap-2 text-gray-600 hover:text-black pb-1 px-2 hover:scale-110 transition-all ease-in-out duration-300"
          >
            <Undo2/>
          </button>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black">{data?.title}</h2>
            {data.User?.name && (
              <p className="text-sm sm:text-base text-black font-poppins mt-1">
                Publicación de:{" "}
                <span className="font-medium">{data.User.name}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 px-16">
          {/* Contenido dinámico */}
          {data?.content?.map((cont, index) => {
            if (cont.contentType === "text") {
              return (
                <p
                  key={index}
                  className="text-base text-justify leading-relaxed font-poppins"
                >
                  {cont.value}
                </p>
              );
            } else if (cont.contentType === "image") {
              return (
                <img
                  key={index}
                  src={cont.value}
                  alt={`Imagen-${index}`}
                  className="w-full object-cover shadow-lg rounded-md"
                />
              );
            } else if (cont.contentType === "video") {
              return (
                <div key={index} className="aspect-video ">
                  <iframe
                    className="w-full h-full shadow-lg rounded-md"
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

          {/* Comentarios */}
          <div className="p-4 bg-snow/20 rounded-md shadow-lg">
            <h3 className="text-2xl font-poppins">Comentarios</h3>
            <FormAddComment postId={data?.id} />
            <CommentSection data={data?.Replies} postId={data?.id} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostDetail;
