"use client";

import { ChevronLeft } from "lucide-react";
import CommentSection from "./CommentSection";
import FormAddComment from "./FormAddComment";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const PostDetail = ({ data }) => {
  const router = useRouter();

  const t = useTranslations("Blog");

  return (
    <div className=" relative max-w-[calc(60vw)] mx-auto">
      {/* Fondo degradado con opacidad */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradientRight to-gradientLeft  opacity-20"></div>

      {/* Contenido por encima del fondo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Contenedor superior con título y botón */}
        <div className="flex justify-between items-center px-10">
          {/* Título y autor */}
          <div className="flex-1">
            <div className="flex flex-row mt-6">
              <button
                onClick={() => router.back()}
                className="hover:scale-125 transition-transform mr-2"
              >
                <ChevronLeft />
              </button>
              <h2 className="text-3xl font-bold text-black">{data?.title}</h2>
            </div>
          </div>
        </div>
        {data.User?.name && (
          <p className="text-sm sm:text-base text-black font-poppins px-20">
            {t("PostDetail.Text1")}{" "}
            <span className="font-medium">{data.User.name}</span>
          </p>
        )}

        <div className="flex flex-col gap-5">
          {/* Contenido dinámico */}

          <div className="min-h-[calc(100vh-25rem)] px-20 my-6">
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
                      src={
                        cont.value.replace("watch?v=", "embed/").split("&")[0]
                      }
                      title={`Video-${index}`}
                      allowFullScreen
                    />
                  </div>
                );
              } else {
                return (
                  <div key={index} className="text-red-500 text-center">
                    {t("PostDetail.Error")}
                  </div>
                );
              }
            })}
          </div>
          {/* Comentarios */}
          <div className="p-4 bg-snow/20 shadow-lg w-full">
            <h3 className="text-2xl font-poppins">
              {t("PostDetail.Subtitle")}
            </h3>
            <FormAddComment postId={data?.id} />
            <CommentSection data={data?.Replies} postId={data?.id} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostDetail;
