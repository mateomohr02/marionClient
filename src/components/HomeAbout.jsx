import { useTranslations } from "next-intl";

const HomeAbout = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col-reverse xl:flex-row items-center justify-center w-full px-6  my-6 lg:px-10">
      {/* Contenedor del texto */}
      <div className="xl:w-1/2 text-justify text-xl lg:text-2xl text-black font-poppins leading-relaxed lg:pr-20">
        <h2 className="font-dancing text-4xl md:text-6xl text-gradient px-1">
          <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
            {t("HomeAbout.Title")}
          </span>
        </h2>

        <p className="mt-6">
          {t.rich("HomeAbout.Text1", {
            span: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
        </p>

        <p className="mt-4">
          {t.rich("HomeAbout.Text2", {
            span: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
        </p>

        <p className="mt-4">
          {t.rich("HomeAbout.Text3", {
            span: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
        </p>

        <p className="mt-4">
          {t.rich("HomeAbout.Text4", {
            span: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
        </p>

        <ul className="list-disc mt-4 ml-6">
          <li>
            {t.rich("HomeAbout.Q1", {
              span: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </li>
          <li>
            {t.rich("HomeAbout.Q2", {
              span: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </li>
          <li>
            {t.rich("HomeAbout.Q3", {
              span: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </li>
        </ul>

        <p className="mt-4">
          {t.rich("HomeAbout.Text5", {
            span: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
        </p>

        <p className="mt-4">
          {t.rich("HomeAbout.Text6", {
            span: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
        </p>

        <p className="mt-4">
          {t.rich("HomeAbout.Text7", {
            span: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
        </p>
      </div>

      {/* Carrusel de imágenes */}
      <div className="relative w-full xl:w-1/4  min-h-[216px] xl:max-h-[1000px] xl:min-h-[900px] overflow-hidden mb-10 xl:mb-10">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-bl from-gradientRight to-gradientLeft opacity-75 z-0"></div>

        {/* Gradiente de fade lateral (mobile) / superior (xl) */}
        <div
          className="
      pointer-events-none absolute z-20
      top-0 left-0 h-full w-12 bg-gradient-to-r from-pastelPink to-transparent
      xl:top-0 xl:left-0 xl:right-0 xl:h-12 xl:w-full xl:bg-gradient-to-b
    "
        ></div>

        {/* Gradiente de fade lateral derecho (mobile) / inferior (xl) */}
        <div
          className="
      pointer-events-none absolute z-20
      top-0 right-0 h-full w-12 bg-gradient-to-l from-pastelPink to-transparent
      xl:top-auto xl:bottom-0 xl:left-0 xl:right-0 xl:h-12 xl:w-full xl:bg-gradient-to-t
    "
        ></div>

        {/* Carrusel */}
        <div
          className="
      absolute flex pt-2 gap-2 px-2 z-10
      flex-row animate-scrollLeft
      xl:flex-col xl:animate-scrollUp
    "
        >
          {[
            "https://imgur.com/5dGNQnB.png",
            "https://imgur.com/AHJRGVz.png",
            "https://imgur.com/D1u8HAF.png",
            "https://imgur.com/uBWwtRC.png",
            "https://imgur.com/FIbx0W3.png",
            "https://imgur.com/2qJab8P.png",
          ]
            .concat([
              "https://imgur.com/5dGNQnB.png",
              "https://imgur.com/AHJRGVz.png",
              "https://imgur.com/D1u8HAF.png",
              "https://imgur.com/uBWwtRC.png",
              "https://imgur.com/FIbx0W3.png",
              "https://imgur.com/2qJab8P.png",
            ])
            .map((url, index) => (
              <div
                key={index}
                className="w-[150px] xl:w-full h-auto overflow-hidden shadow-md"
              >
                <img
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
