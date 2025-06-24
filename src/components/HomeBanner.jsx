import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const HomeBanner = () => {

  const t = useTranslations("Home")

  return (
    <div className="w-full">
      <div className="relative w-full mx-auto flex flex-col items-center justify-center p-10 overflow-hidden">
        {/* Fondo base fijo (sin animación) */}
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-60"></div>
        
        {/* Capa superior animada para pulso solo en el fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft  blur-3xl animate-pulse"></div>

        {/* Contenedor del texto y botón */}
        <div className="relative z-10 text-center max-w-3xl filter-none opacity-100">
          <p className="text-3xl md:text-4xl font-poppins font-semibold text-white drop-shadow-lg mb-6">
            {t("HomeBanner.CTA")}
          </p>
          <Link href="/areaPersonal">
            <span className="inline-block px-10 py-4 bg-white/90 text-primary font-extrabold font-poppins rounded-full shadow-xl backdrop-blur-sm hover:bg-white hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out cursor-pointer no-underline">
              ✨ {t("HomeBanner.btn")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
