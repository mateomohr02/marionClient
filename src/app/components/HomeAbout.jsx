const HomeAbout = () => {
  return (
    <div className="flex items-center justify-center w-full py-16 px-10">
      {/* Contenedor del texto */}
      <div className="w-1/2 text-justify text-2xl text-black font-poppins leading-relaxed pr-20">
        <h2 className="font-dancing text-6xl text-gradient">
          <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
            Sobre mí...
          </span>
        </h2>

        <p className="mt-6">
          Soy <span className="font-bold">Marion Striegel</span>, finalicé mi
          carrera de <span className="font-bold">partera obstétrica</span> en el
          1984 en <span className="font-bold">Alemania</span>, y durante los
          siguientes años trabajé en una gran clínica, donde perfeccioné mis
          habilidades.
        </p>

        <p className="mt-4">
          En 1989 decidí dar un nuevo paso y comencé a trabajar en un{" "}
          <span className="font-bold">consultorio particular</span>, donde di{" "}
          <span className="font-bold">clases pre y postparto</span>, asistiendo{" "}
          <span className="font-bold">partos ambulatorios</span> y acompañando a{" "}
          <span className="font-bold">madres</span> en sus hogares con sus{" "}
          <span className="font-bold">recién nacidos</span>. Por la creciente
          demanda comencé con los{" "}
          <span className="font-bold">nacimientos domiciliarios</span> en el
          1990.
        </p>

        <p className="mt-4">
          En 1996 emigré con mi familia a{" "}
          <span className="font-bold">Argentina</span>, donde sigo ejerciendo mi{" "}
          <span className="font-bold">pasión:</span> aconsejar, acompañar y
          construir confianza en el{" "}
          <span className="font-bold">embarazo, parto y postparto</span>.
        </p>

        <p className="mt-4">
          Hace unos años, un{" "}
          <span className="font-bold">momento único y desafiante</span> marcó el
          mundo: la pandemia del COVID. De repente, todo se detuvo... Pero los{" "}
          <span className="font-bold">bebés</span> siguieron creciendo, los{" "}
          <span className="font-bold">embarazos</span> avanzaron y las{" "}
          <span className="font-bold">madres</span> se enfrentaron a{" "}
          <span className="font-bold">incertidumbres y preguntas</span>:
        </p>

        <ul className="list-disc mt-4 ml-6">
          <li>
            ¿Cómo nos <span className="font-bold">preparamos?</span>
          </li>
          <li>
            ¿Dónde encontramos <span className="font-bold">respuestas?</span>
          </li>
          <li>
            ¿Qué nos <span className="font-bold">espera</span> en el{" "}
            <span className="font-bold">embarazo</span>, el{" "}
            <span className="font-bold">parto</span> y el <span>puerperio</span>
            ?
          </li>
        </ul>

        <p className="mt-4">
          Fue entonces cuando nació la idea de este{" "}
          <span className="font-bold">proyecto</span>.
        </p>

        <p className="mt-4">
          Un <span className="font-bold">espacio online</span> para{" "}
          <span className="font-bold">acompañarlas</span> en cada etapa y ayudar
          a más madres en este{" "}
          <span className="font-bold">proceso tan especial</span>!
        </p>

        <p className="mt-4">
          Hoy, con <span className="font-bold">experiencia y vocación</span>,
          hago realidad este <span className="font-bold">sueño</span> para estar{" "}
          <span className="font-bold">más cerca de vos</span>.
        </p>
      </div>

      {/* Contenedor de imágenes (placeholder) */}
      {/* Contenedor de imágenes con fondo opaco */}
      <div className="relative w-1/4 flex flex-col p-2 gap-2">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-bl from-gradientRight to-gradientLeft opacity-75"></div>

        {/* Imágenes sin opacidad */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] bg-gray-300 flex items-center justify-center z-10"
          >
            <span className="text-gray-600 text-lg">Imagen {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAbout;
