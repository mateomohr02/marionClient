"use client";
import { useSelector } from "react-redux";

const LessonCard = () => {
  const lesson = useSelector((state) => state.course.lessonDetail);

  return (
    <div className="px-8">
      <h1 className="text-4xl font-semibold mb-4 w-3/5 m-auto">{lesson.title}</h1>

      <div className="flex flex-col gap-4">
        {lesson?.content?.map((cont, index) => {
          if (cont.contentType === "text") {
            return (
              <p key={index} className="text-base leading-relaxed text-left w-3/5 m-auto">
                {cont.value}
              </p>
            );
          }

          if (cont.contentType === "image") {
            return (
              <div key={index} className="flex justify-center">
                <img
                  src={cont.value}
                  alt={`Imagen-${index}`}
                  className="w-3/5 mx-auto object-cover shadow-lg"
                />
              </div>
            );
          }

          if (cont.contentType === "video") {
            return (
              <div key={index} className="flex justify-center">
                <div className="w-3/5 aspect-video mx-auto my-4">
                  <iframe
                    className="w-full h-full shadow-lg"
                    src={cont.value.replace("watch?v=", "embed/").split("&")[0]}
                    title={`Video-${index}`}
                    allowFullScreen
                  />
                </div>
              </div>
            );
          }

          if (cont.contentType === "section") {
            const qImages = parseInt(cont.qImages || "0", 10);
            const isMultipleImages = qImages > 1;
            const textContent = cont.value.find(
              (v) => v.contentType === "text"
            );
            const images = cont.value.filter((v) => v.contentType === "image");
            const video = cont.value.find((v) => v.contentType === "video");

            return (
              <div key={index} className="flex flex-col gap-2 w-3/5 m-auto">
                {cont.subtitle && (
                  <h2 className="text-3xl mb-2">{cont.subtitle}</h2>
                )}

                {isMultipleImages ? (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-[calc(100vw/8*5)]">
                      {textContent && (
                        <p className="text-base leading-relaxed text-left">
                          {textContent.value}
                        </p>
                      )}
                    </div>
                    <div className="w-[calc(100vw/8*3)] flex flex-col gap-8">
                      {images.map((img, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={img.value}
                          alt={`Sección-Imagen-${imgIdx}`}
                          className=" object-cover shadow-lg"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {textContent && (
                      <p className="text-base leading-relaxed text-left">
                        {textContent.value}
                      </p>
                    )}
                    {images.length === 1 && (
                      <div className="flex justify-center">
                        <img
                          src={images[0].value}
                          alt="Sección-Imagen-0"
                          className="w-[calc(100vw/8*3)] mx-auto rounded-lg object-cover shadow-lg"
                        />
                      </div>
                    )}
                  </>
                )}

                {video && (
                  <div key={index} className="flex justify-center">
                    <div className="w-3/5 aspect-video mx-auto my-4">
                      <iframe
                        className="w-full h-full shadow-lg"
                        src={
                          cont.value.replace("watch?v=", "embed/").split("&")[0]
                        }
                        title={`Video-${index}`}
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={index} className="text-red-500 text-center">
              Error al obtener el contenido de la publicación
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonCard;
