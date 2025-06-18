"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { setCourseDetail } from "@/redux/slices/courseSlice";
import Loading from "@/components/Loading";
import { showAlert } from "@/redux/slices/alertSlice";
import { useTranslations } from "next-intl";

const Page = () => {
  const course = useSelector((state) => state.course.courseDetail);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const courseSlug = params.courseName.replace(/-/g, " ");
  const [loading, setLoading] = useState(!course);
  const [error, setError] = useState(null);
  const [authorization, setAuthorization] = useState(false);

  const t = useTranslations("Cursos");

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("token");

      // Si no hay token, redirige al login
      if (!token) {
        dispatch(showAlert(t("DetailPage.LoginReq")))
        router.push("/login");
        return;
      }else{
        setAuthorization(true);
      }

      if (!course) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_ROUTE}/api/courses/get-course-by-name?name=${courseSlug}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data) {
            dispatch(setCourseDetail(res.data.course));
          } else {
            setError(t("DetailPage.NotFound"));
          }
        } catch (err) {
          setError(t("DetailPage.FetchError"));
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourse();
  }, [course, courseSlug, dispatch, router]);

  if (loading || !authorization) return <Loading />;
  if (error) return <p>{error}</p>;

  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYf";

  return (
    <div className="max-w-[62.5vw] mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Texto */}
        <div className="flex flex-col flex-grow basis-3/5">
          <h1 className="text-4xl font-bold font-poppins mb-6 text-gray-900">
            {course?.name}
          </h1>
          <p className="text-lg font-poppins text-justify leading-relaxed pr-0 sm:pr-8">
            {course?.description}
          </p>
        </div>

        {/* Imagen */}
        <div className="basis-2/5 flex justify-center lg:justify-end">
          <img
            src={course?.poster || placeholder}
            alt={course?.name || "Course Poster"}
            className="shadow-lg object-cover w-full max-w-[450px] h-auto"
          />
        </div>
      </div>

      {/* Botón de compra más destacado */}
      <div className="relative w-fit mx-auto mt-20 group">
        {/* Fondo animado más difuso y brillante */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 rounded-full blur-md opacity-80 group-hover:blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse scale-105" />

        {/* Botón principal */}
        <Link href={`${pathname}/checkout`}>
          <span className="relative z-10 inline-block px-12 py-5 bg-white/90 hover:bg-white text-xl font-bold font-poppins text-gray-900 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer no-underline">
            ✨ {t("DetailPage.Cta")}{" "}
            <span className="text-primary font-extrabold">
              ${course?.price}
            </span>
          </span>
        </Link>
      </div>

      <p className="text-4xl mx-auto font-poppins font-semibold text-center my-16">
        {t("DetailPage.Text1")} 👇
      </p>

      {/* Contenido teórico */}
      {course?.content?.length > 0 && (
        <div className=" flex flex-col gap-10">
          {course.content.map((cont, index) => {
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
                      controls
                      className="w-full h-full object-cover"
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
              const video = cont.value.find((v) => v.contentType === "video");

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
          })}
        </div>
      )}
      {/* Botón de compra más destacado */}
      <div className="relative w-fit mx-auto mt-20 group">
        {/* Fondo animado más difuso y brillante */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 rounded-full blur-md opacity-80 group-hover:blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse scale-105" />

        {/* Botón principal */}
        <Link href={`${pathname}/checkout`}>
          <span className="relative z-10 inline-block px-12 py-5 bg-white/90 hover:bg-white text-xl font-bold font-poppins text-gray-900 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer no-underline">
            ✨ Obtener Acceso Completo por{" "}
            <span className="text-primary font-extrabold">
              ${course?.price}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
