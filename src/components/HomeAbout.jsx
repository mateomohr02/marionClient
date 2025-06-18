import { useTranslations } from "next-intl";

const HomeAbout = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex items-center justify-center w-full py-16 px-10">
      {/* Contenedor del texto */}
      <div className="w-1/2 text-justify text-2xl text-black font-poppins leading-relaxed pr-20">
        <h2 className="font-dancing text-6xl text-gradient">
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
      <div className="relative w-1/4 max-h-[1000px] min-h-[900px] overflow-hidden">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-bl from-gradientRight to-gradientLeft opacity-75 z-0"></div>

        {/* Gradiente de fade arriba */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 z-20 bg-gradient-to-b from-pastelPink to-transparent"></div>

        {/* Gradiente de fade abajo */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 z-20 bg-gradient-to-t from-pastelPink to-transparent"></div>

        {/* Carrusel */}
        <div className="absolute flex flex-col animate-[scrollUp_80s_linear_infinite] z-10 px-2 gap-2">
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
                className="w-full h-fit overflow-hidden shadow-md"
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
