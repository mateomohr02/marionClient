import { useTranslations } from "next-intl";
import Image from "next/image";

const HeroHeader = () => {
  const t = useTranslations("Home");

  return (
    <div className="relative w-full h-[600px] z-10 flex items-center justify-center">
      {/* Imagen de fondo mobile */}
      <Image
        src="/mobile-background.png"
        alt="Partera Marion"
        layout="fill"
        objectFit="cover"
        sizes="100vw"
        quality={100}
        className="xl:hidden absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Imagen de fondo desktop */}
      <Image
        src="/marionBackground.png"
        alt="Partera Marion"
        layout="fill"
        objectFit="cover"
        sizes="100vw"
        quality={100}
        className="hidden xl:block absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Contenido ajustado */}
      <div className="xl:absolute xl:top-[20%] xl:left-[20%] text-white flex flex-col">
        <h1 className="text-4xl md:text-7xl font-dancing">{t("HeroHeader.Title")}</h1>
        <p className="text-2xl md:text-5xl md:mt-4 md:leading-tight font-poppins md:text-justify">
          {t("HeroHeader.Text1")} <br />
          <span className="font-extrabold md:text-7xl md:text-justify md:tracking-wider whitespace-pre-line">
            {t("HeroHeader.Text2")}
          </span>
          .
        </p>
        <p className="text-xl md:text-3xl md:mt-4 font-poppins">
          <span className="font-extrabold">{t("HeroHeader.Text3")}</span>{" "}
          {t("HeroHeader.Text4")}
        </p>
      </div>
    </div>
  );
};

export default HeroHeader;
