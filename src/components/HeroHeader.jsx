import { useTranslations } from "next-intl";
import Image from "next/image";

const HeroHeader = () => {

  const t = useTranslations("Home")

  return (
    <div className="relative w-full h-[600px] z-10 flex items-center justify-center">
      {/* Imagen de fondo */}
      <Image
        src="/marionBackground.png"
        alt="Partera Marion"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* Contenido ajustado */}
      <div className="absolute top-[20%] left-[20%] text-white flex flex-col">
        <h1 className="text-7xl font-dancing">
          {t("HeroHeader.Title")}
        </h1>
        <p className="text-5xl mt-4 leading-tight font-poppins text-justify">
          {t("HeroHeader.Text1")} <br /> 
          <span className="font-extrabold text-7xl text-justify tracking-wider whitespace-pre-line">{t("HeroHeader.Text2")}</span>.
        </p>
        <p className="text-3xl mt-4 font-poppins">
          <span className="font-extrabold">{t("HeroHeader.Text3")}</span> {t("HeroHeader.Text4")}
        </p>
      </div>
    </div>
  );
};

export default HeroHeader;

