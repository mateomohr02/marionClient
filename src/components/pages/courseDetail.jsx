"use client";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { setCourseDetail } from "@/redux/slices/courseSlice";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import useGetCourseDetail from "@/hooks/useGetCourseDetail";
import Error from "@/components/Error";
import { showAlert } from "@/redux/slices/alertSlice";
import { ChevronLeft } from "lucide-react";

const CourseDetail = () => {
  const dispatch = useDispatch();
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.courseName;
  const t = useTranslations("Cursos");

  const [authorization, setAuthorization] = useState(false);

  // 1. Verificar token y autorización
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(showAlert(t("DetailPage.LoginReq")));
      router.push("/login");
    } else {
      setAuthorization(true);
    }
  }, [dispatch, router, t]);

  // 2. Obtener curso usando el custom hook
  const { course, loading, error } = useGetCourseDetail(courseSlug, locale, {
    messages: {
      unauthorized: t("Hook.unauthorized"),
      badRequest: t("Hook.badRequest"),
      noRecord: t("Hook.noRecord"),
      serverError: t("Hook.serverError"),
    },
  });

  // 3. Guardar en Redux cuando llega el curso
  useEffect(() => {
    if (course) {
      dispatch(setCourseDetail(course));
    }
  }, [course, dispatch]);

  if (loading || !authorization) return <Loading />;

  if (error) return <Error msj={error} />;

  const placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."; // Reemplazá con el real

  return (
    <div className="xl:max-w-[62.5vw] mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start">
        <div className="flex flex-col flex-grow basis-3/5">
          <div className="flex flex-row items-center gap-2">
            <button onClick={() => router.back()} className="hover:scale-125">
              <ChevronLeft />
            </button>
            <h1 className="text-xl xl:text-4xl font-bold font-poppins text-gray-900">
              {locale === "de" ? course?.name?.de : course?.name?.es}
            </h1>
          </div>
          <p className="text-lg font-poppins pl-7 xl:pl-9 text-justify leading-relaxed pr-0 sm:pr-8 mt-8">
            {locale === "de"
              ? course?.description?.de
              : course?.description?.es}
          </p>
        </div>

        <div className="basis-2/5 flex justify-center lg:justify-end">
          <img
            src={
              locale === "de"
                ? course?.poster?.de
                : course?.poster?.es || placeholder
            }
            alt={locale === "de" ? course?.name?.de : course?.name?.es}
            className="shadow-lg object-cover w-full max-w-[500px] h-auto"
          />
        </div>
      </div>

      {/* Botón de compra */}
      <div className="relative w-fit mx-auto mt-10 xl:mt-20 group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 rounded-full blur-md opacity-80 group-hover:blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse scale-105" />
        <Link href={`${pathname}/checkout`}>
          <span className="relative z-10 inline-block px-6 xl:px-12 py-5 bg-white/90 hover:bg-white text-md xl:text-xl font-bold font-poppins text-gray-900 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out md:whitespace-nowrap cursor-pointer no-underline">
            ✨ {t("DetailPage.Cta")}{" "}
            <span className="text-primary font-extrabold">
              {locale === "de"
                ? `€${course?.price?.eur}`
                : `$${course?.price?.ars}`}
            </span>
          </span>
        </Link>
      </div>

      <p className="text-xl xl:text-4xl mx-auto font-poppins font-semibold text-center my-8 xl:my-16">
        {t("DetailPage.Text1")} 👇
      </p>
      <div className="flex flex-grow basis-3/5 items-center justify-center">
        {/* Contenido teórico */}
        {(locale === "de"
          ? course?.content?.de?.length
          : course?.content?.es?.length) > 0 && (
          <div className="flex flex-col gap-10">
            {(locale === "de" ? course.content.de : course.content.es).map(
              (cont, index) => {
                if (cont.contentType === "text") {
                  return (
                    <p
                      key={index}
                      className="text-lg font-poppins text-justify leading-relaxed pr-0 sm:pr-8"
                    >
                      {cont.value}
                    </p>
                  );
                }

                if (cont.contentType === "image") {
                  return (
                    <div key={index} className="flex justify-center">
                      <img
                        src={cont.value || placeholder}
                        alt={`Imagen-${index}`}
                        onError={(e) => (e.target.src = placeholder)}
                        className="rounded-xl shadow-md w-full object-cover"
                      />
                    </div>
                  );
                }

                if (cont.contentType === "video") {
                  return (
                    <div key={index} className="flex justify-center">
                      <div className="w-full aspect-video overflow-hidden shadow-md">
                        <iframe
                          src={
                            cont.value
                              .replace("watch?v=", "embed/")
                              .split("&")[0]
                          }
                          className="w-full h-full object-cover"
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
                  const images = cont.value.filter(
                    (v) => v.contentType === "image"
                  );
                  const video = cont.value.find(
                    (v) => v.contentType === "video"
                  );

                  return (
                    <section key={index} className="flex flex-col gap-4">
                      {cont.subtitle && (
                        <h2 className="text-3xl font-semibold mb-3 font-poppins">
                          {cont.subtitle}
                        </h2>
                      )}

                      {isMultipleImages ? (
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="text-lg font-poppins text-justify leading-relaxed pr-0 sm:pr-8 basis-3/5">
                            {textContent && <p>{textContent.value}</p>}
                          </div>
                          <div className="md:w-2/5 flex flex-col gap-6 basis-2/5">
                            {images.map((img, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={img.value || placeholder}
                                alt={`Sección-Imagen-${imgIdx}`}
                                onError={(e) => (e.target.src = placeholder)}
                                className="shadow-lg w-full object-cover max-h-72"
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          {textContent && (
                            <p className="text-lg font-poppins text-justify leading-relaxed mb-4">
                              {textContent.value}
                            </p>
                          )}
                          {images.length === 1 && (
                            <div className="flex justify-center">
                              <img
                                src={images[0].value || placeholder}
                                alt="Sección-Imagen-0"
                                onError={(e) => (e.target.src = placeholder)}
                                className="w-full shadow-lg object-cover"
                              />
                            </div>
                          )}
                        </>
                      )}

                      {video && (
                        <div className="flex justify-center mt-6">
                          <div className="w-full max-w-4xl aspect-video overflow-hidden shadow-lg">
                            {video.value === "" ? (
                              <img
                                key={index * 15}
                                src={placeholder}
                                alt={`Sección-Video-Placeholder-${index}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <iframe
                                className="w-full h-full"
                                src={
                                  video.value
                                    .replace("watch?v=", "embed/")
                                    .split("&")[0]
                                }
                                title={`Seccion-Video-${index}`}
                                allowFullScreen
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </section>
                  );
                }

                return null;
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
