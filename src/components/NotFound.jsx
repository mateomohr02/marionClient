import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';





const NotFound = () => {
  
  const t = useTranslations("Other")
  
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="-translate-y-32 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🔍 {t("NotFound.t1")}</h1>
        <p className="text-lg text-gray-700 mb-6 max-w-md">
          {t("NotFound.t2")} <br />
          {t("NotFound.t3")}
        </p>
        <div className="relative w-fit mx-auto group mt-2">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 rounded-full blur-md opacity-80 group-hover:blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse scale-105" />
          <Link href="/">
            <span className="relative z-10 inline-block px-12 py-5 bg-white/90 hover:bg-white text-xl font-semibold text-gray-900 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer no-underline">
              {t("NotFound.returnBtn")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
