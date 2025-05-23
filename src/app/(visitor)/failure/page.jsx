"use client";

import Link from "next/link";

const Page = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="-translate-y-32 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">❌ ¡Pago fallido!</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Algo salió mal con tu pago. Si el problema persiste, por favor comunicate con soporte.
        </p>
        <div className="relative w-fit mx-auto group mt-2">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-rose-500 rounded-full blur-md opacity-80 group-hover:blur-lg group-hover:opacity-100 transition-all duration-500 animate-pulse scale-105" />
          <Link href="/cursos">
            <span className="relative z-10 inline-block px-12 py-5 bg-white/90 hover:bg-white text-xl font-semibold text-gray-900 rounded-full backdrop-blur-sm shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out whitespace-nowrap cursor-pointer no-underline">
              Volver a Cursos
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
