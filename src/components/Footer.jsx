import { SiYoutube } from "react-icons/si";
import { PiInstagramLogoBold } from "react-icons/pi";
import { Link } from '@/i18n/navigation';
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Navbar");

  return (
    <div className="relative z-50 py-20 before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-gradient-to-r before:from-gradientLeft before:to-gradientRight after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-gradient-to-r after:from-gradientLeft after:to-gradientRight">
      
      {/* Layout adaptable */}
      <div className="flex flex-col items-center gap-10 max-w-7xl mx-auto xl:flex-row xl:justify-between xl:items-start xl:gap-0">
        
        {/* Redes Sociales */}
        <div className="flex flex-col items-center gap-4 xl:items-start">
          <Link
            href="https://www.instagram.com/marion.striegel.64/"
            target="blank"
            className="hover:underline flex items-center text-lg font-poppins"
          >
            <PiInstagramLogoBold className="text-4xl text-gradientLeft mr-2" />
            <span>Instagram - @marion.striegel.64</span>
          </Link>
          <Link
            href=""
            target="blank"
            className="hover:underline flex items-center text-lg font-poppins"
          >
            <SiYoutube className="text-4xl text-gradientLeft mr-2" />
            <span>YouTube -</span>
          </Link>
        </div>

        {/* Links de Navegación */}
        <div className="flex flex-col items-center gap-4 text-lg font-poppins">
          <Link href="/" className="hover:underline">{t("Label1")}</Link>
          <Link href="/cursos" className="hover:underline">{t("Label2")}</Link>
          <Link href="/comunidad" className="hover:underline">{t("Label3")}</Link>
          <Link href="/areaPersonal" className="hover:underline">{t("Label4")}</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
