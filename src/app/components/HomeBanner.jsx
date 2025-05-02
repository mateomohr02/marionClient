import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="w-full py-10">
      <div className="relative w-full flex items-center justify-center p-10">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-60"></div>

        {/* Texto con opacidad 100% */}
        <p className="relative text-4xl text-shadow font-poppins z-10">
          Registrate <Link href="/areaPersonal" className="text-blue-400 hover:underline">AQUI</Link> para acceder a formaciones y a nuestra comunidad.
        </p>
      </div>
    </div>
  );
};

export default HomeBanner;
