import { SiYoutube } from "react-icons/si";
import { PiTiktokLogoBold, PiInstagramLogoBold } from "react-icons/pi";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative py-20 mt-10 before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-gradient-to-r after:from-gradientLeft after:to-gradientRight">
      <div className="flex justify-between items-start max-w-7xl mx-auto">
        {/* Redes Sociales */}
        <div className="flex flex-col items-start gap-4">
          <Link href="https://www.instagram.com/marion.striegel.64/" target="blank" className="hover:underline flex items-center text-2xl font-poppins">
            <PiInstagramLogoBold className="text-4xl text-gradientLeft mr-2" />
            <span>Instagram - @marion.striegel.64</span>
          </Link >
          <Link href="" target="blank" className="flex items-center text-2xl font-poppins hover:underline">
            <SiYoutube className="text-4xl text-gradientLeft mr-2" />
            <span>YouTube -</span>
          </Link >
        </div>

        {/* Links de Navegación */}
        <div className="flex flex-col items-center gap-4 text-2xl font-poppins">
          <Link href="/" className="hover:underline">Inicio</Link>
          <Link href="/cursos" className="hover:underline">Descubre Cursos</Link>
          <Link href="/comunidad" className="hover:underline">Noticias y Foros</Link>
          <Link href="/areaPersonal" className="hover:underline">Mi Aprendizaje</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

