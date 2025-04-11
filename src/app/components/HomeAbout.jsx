const HomeAbout = () => {
  return (
    <div className="flex items-center justify-center w-full py-16 px-10">

      {/* Contenedor del texto */}
      <div className="w-1/2">
        <h2 className="font-dancing text-6xl text-gradient">
          <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
            Sobre mí...
          </span>
        </h2>

        <p className="text-2xl text-black mt-6 leading-relaxed font-poppins">
          Soy <span className="font-bold">Marion Striegel</span>, finalicé mi carrera de{" "}
          <span className="font-bold">partera <br />obstétrica</span> en el 1984 en{" "}
          <span className="font-bold">Alemania</span>, y durante los <br />siguientes años trabajé en una gran clínica, <br /> donde perfeccioné mis habilidades.
        </p>
      <br />
        <p className="text-2xl text-black mt-4 leading-relaxed font-poppins">
          En 1989 decidí dar un nuevo paso y comencé a  <br /> trabajar en un{" "}
          <span className="font-bold">consultorio particular</span>, donde di{" "} <br />
          <span className="font-bold">clases pre y postparto</span>, asistiendo{" "}
          <span className="font-bold">partos <br /> ambulatorios</span> y acompañando a{" "}
          <span className="font-bold">madres</span> en sus <br /> hogares con sus{" "}
          <span className="font-bold">recién nacidos.<br /></span>
          <span>Por la creciente demanda comencé con los{" "}</span><br />
          <span className="font-bold">nacimientos domiciliarios</span> en el 1990.
        </p>

      <br />

        <p className="text-2xl text-black mt-4 leading-relaxed font-poppins">
          En 1996 emigré con mi familia a{" "}
          <span className="font-bold">Argentina</span>, donde <br /> sigo ejerciendo mi{" "}
          <span className="font-bold">pasión:</span><br /> aconsejar, acompañar y{" "}
          construir confianza en el{" "} <br/>
          <span className="font-bold">embarazo, parto y postparto</span>.
        </p>
        <br />


        <p className="text-2xl text-black mt-4 leading-relaxed font-poppins">
          Hace unos años, un <span className="font-bold">momento único y desafiante</span><br />{" "}
          marcó el mundo: la pandemia del COVID. 
          <br />De repente, todo se detuvo... Pero los{" "}
          <span className="font-bold">bebés</span> siguieron <br /> creciendo, los{" "}
          <span className="font-bold">embarazos</span> avanzaron y las <br />{" "}
          <span className="font-bold">madres</span> se enfrentaron a{" "}
          <span className="font-bold">incertidumbres y <br />preguntas</span>:
        </p>

        <ul className="list-disc text-2xl mt-4 ml-6">
          <li>¿Cómo nos <span className="font-bold">preparamos?</span></li>
          <li>¿Dónde encontramos <span className="font-bold">respuestas?</span></li>
          <li>¿Qué nos <span className="font-bold">espera</span> en el <span className="font-bold">embarazo</span>, el <span className="font-bold">parto</span> y el <span>puerperioP</span></li>
        </ul>

        <p className="text-2xl text-black mt-4 leading-relaxed font-poppins">
          Fue entonces cuando nació la idea de este{" "}
          <span className="font-bold">proyecto</span>.
        </p>

        <br />

        <p className="text-2xl text-black mt-4 leading-relaxed font-poppins">
          Un <span className="font-bold">espacio online</span> para{" "}
          <span className="font-bold">acompañarlas</span> en cada <br /> etapa y ayudar{" "}
          a más madres en este <span className="font-bold">proceso <br />tan especial</span>!
        </p>

        <p className="text-2xl text-black mt-4 leading-relaxed font-poppins">
          Hoy, con <span className="font-bold">experiencia y vocación</span>, hago realidad <br />{" "}
          este <span className="font-bold">sueño</span> para estar{" "}
          <span className="font-bold">más cerca de vos</span>.
        </p>
        <br />
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
