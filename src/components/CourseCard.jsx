import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { useSetCourseDetail } from "@/hooks/useSetCourseDetail";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

const CourseCard = ({ course, index, locale }) => {
  const setCourseDetail = useSetCourseDetail();
  const handleClick = () => setCourseDetail(course);

  const t = useTranslations("Cursos");

  const placeholder =
    "data:image/png;base64,..."; // lo dejás como está

  const imageSrc =
    (locale === "de" ? course?.poster?.de : course?.poster?.es) || placeholder;

  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center p-6 sm:p-8 overflow-hidden shadow-lg bg-white/60 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-l from-gradientRight to-gradientLeft opacity-25" />

        <div className="relative flex flex-col md:flex-row gap-8 items-start z-10 max-w-6xl w-full">
          <div className="w-full md:w-[275px] h-[275px] relative flex-shrink-0 overflow-hidden shadow-md">
            <Image
              src={imageSrc}
              alt={`Imagen del curso ${locale === "de" ? course?.name?.de : course?.name?.es}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between h-full text-black max-w-3xl w-full">
            <div>
              <h2 className="text-3xl font-bold font-poppins">
                {locale === 'de' ? course?.name?.de : course?.name?.es}
              </h2>

              <p className="mt-2 text-lg font-poppins">
                {t("CourseCard.Lang")} <span className="font-semibold">Español - Deutsch</span>
              </p>

              <p className="mt-3 text-base text-justify leading-relaxed font-poppins ">
                {(locale === "de" ? course?.description?.de : course?.description?.es).slice(0, 490)}...
                <Link href={`/courses/${course.slug}`}>
                  <span className="text-primary hover:underline ml-1 font-semibold">
                    {t("CourseCard.Btn1")}
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Link
                href={`/courses/${course.slug}`}
                onClick={handleClick}
                className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />
                <span className="relative z-10 px-6 py-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
                  🎓 {t("CourseCard.Cta")}
                </span>
              </Link>

              <Link
                href={`/courses/${course.slug}/checkout`}
                onClick={handleClick}
                className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />
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
