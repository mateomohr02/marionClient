

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSetCourseDetail } from "@/hooks/useSetCourseDetail";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

const CourseCard = ({ course, index, locale}) => {

  let courseSlug = "";

  const pathname = usePathname();
  if (locale === 'de') {
     courseSlug = course?.name?.de.replace(/\s+/g, "-");
  }else{
      courseSlug = course?.name?.es.replace(/\s+/g, "-");
  }
 
  const setCourseDetail = useSetCourseDetail();

  const handleClick = () => {
    setCourseDetail(course);
  };

  const t = useTranslations("Cursos");

  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYf";

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
              src={locale === "de" ? course?.poster?.de : course?.poster?.es} 
              alt={`Imagen del curso ${locale === "de" ? course?.name?.de : course?.name?.es}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-between h-full text-black max-w-3xl w-full">
            <div>
              <h2 className="text-3xl font-bold font-poppins">{locale === 'de' ? course?.name?.de : course?.name?.es}</h2>
              <p className="mt-2 text-lg font-poppins">
                {t("CourseCard.Lang")}{" "}
                <span className="font-semibold ">Español - Deutsch</span>
              </p>
              <p className="mt-3 text-base text-justify leading-relaxed font-poppins ">
                {locale === "de" ? course?.description?.de.slice(0, 490) : course?.description?.es.slice(0, 490)}...
                <Link href={`${pathname}/${courseSlug}`}>
                  <span className="text-primary hover:underline ml-1 font-semibold">
                    {t("CourseCard.Btn1")}
                  </span>
                </Link>
              </p>
            </div>

            {/* Botón */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Link
                href={`${pathname}/${courseSlug}`}
                onClick={handleClick}
                className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
              >
                {/* Fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />

                {/* Contenido del botón */}
                <span className="relative z-10 px-6 py-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
                  🎓 {t("CourseCard.Cta")}
                </span>
              </Link>

              <Link
                href={`${pathname}/${courseSlug}/checkout`}
                onClick={handleClick}
                className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
              >
                {/* Fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />

                {/* Contenido del botón */}
                <span className="relative z-10 flex items-center gap-2 px-6 py-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
                  <ShoppingBag size={18} />
                  {t("CourseCard.BuyBtn")}
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
