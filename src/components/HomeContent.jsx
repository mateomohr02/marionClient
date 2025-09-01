import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomeContent() {

  const t = useTranslations("Home")

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full lg:py-16 px-6 md:px-10 max-w-[1440px] mx-auto">
      <div className="w-full lg:w-2/5 flex justify-center mb-10 lg:mb-0">
        <Image
          src="/Contorno.png"
          alt="Contorno"
          height={500}
          width={500}
          objectFit="contain"
          quality={100}
        />
      </div>

      <div className="w-full lg:w-3/5 lg:pl-16">
        <h2 className="font-dancing text-4xl md:text-6xl text-gradient px-1">
          <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
            {t("HomeContent.Title")}
          </span>
        </h2>
        <p className="text-xl lg:text-2xl text-black mt-6 leading-relaxed font-poppins text-justify">
          {t("HomeContent.Text1")}<span className="font-bold">{t("HomeContent.Text2")}</span>{t("HomeContent.Text3")}
        </p>
      </div>
    </div>
  );
}
