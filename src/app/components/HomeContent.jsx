import Image from "next/image";

const HomeContent = () => {
  return (
    <div className="flex items-center justify-center w-full py-16 px-10">
      <div className="max-w-7xl w-full flex items-center mx-auto">
        {/* Imagen más grande */}
        <div className="w-2/5 flex justify-center">
          <Image
            src="/Contorno.png"
            alt="Imágen Contorno"
            height={700} 
            width={700} 
            objectFit="contain"
            quality={100}
          />
        </div>

        {/* Contenido de texto */}
        <div className="w-3/5 pl-16">
          <h2 className="font-dancing text-6xl text-gradient px-1">
            <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
              Lo que encontrarás aquí...
            </span>
          </h2>

          <p className="text-2xl text-black mt-6 leading-relaxed font-poppins">
            Formaciones diseñadas especialmente para <br />
            <span className="font-bold">acompañarte</span> en cada etapa del{" "}
            <span className="font-bold">embarazo:</span> <br /> desde la{" "}
            <span className="font-bold">gestación</span>, hasta el{" "}
            <span className="font-bold">posparto</span>.
          </p>

          <br />

          <p className="text-2xl text-black mt-4 leading-relaxed font-poppins">
            Como <span className="font-bold">partera</span> con experiencia, <br />
            quiero brindarte las <span className="font-bold">herramientas</span> <br />
            y el <span className="font-bold">conocimiento</span> necesario <br />
            para que vivas este proceso <br />
            de forma{" "}
            <span className="font-bold">informada, consciente y segura</span> <br />
            tanto para vos como para tu bebé.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
