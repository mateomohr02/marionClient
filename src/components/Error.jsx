"use client"

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const Error = ({ msj }) => {
  
  const t = useTranslations("Other");

  const router = useRouter()

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="-translate-y-32 flex flex-col items-center max-w-md">
        <div className="text-lg text-gray-700 mb-10 whitespace-pre-line">
          <p>{msj}</p>
        </div>
        <div className="relative w-fit group mt-2">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 rounded-full blur-md opacity-80 group-hover:blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse scale-105" />
          <button onClick={() => router.back()}>
            <span className="relative z-10 inline-block px-12 py-5 bg-pastelPink hover:bg-snow text-xl font-semibold text-gray-900 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer no-underline">
              {t("Error.ReturnBtn")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
