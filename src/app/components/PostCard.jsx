import React from "react";
import Link from "next/link";
import { Image, Video } from "lucide-react";

const PostCard = ({ post, index }) => {
  const imageCount = post.imageUrls?.length || 0;
  const hasVideo = !!post.videoUrl;

  return (
    <div className="w-full">
      <div className="relative w-full flex justify-center p-1">
        {/* Fondo con opacidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-30 w-[calc(50vw)] m-auto rounded-2xl"></div>

        {/* Contenido principal */}
        <div className="relative flex flex-col gap-4 z-10 max-w-4xl w-full rounded-lg p-6 min-h-[250px]">
          {/* Título */}
          <h2 className="text-2xl font-semibold font-poppins text-black">{post.title}</h2>

          {/* Contenido */}
          <p className="text-base font-poppins text-black break-words">
            {post.content.length > 250
              ? `${post.content.slice(0, 250)}...`
              : post.content}
          </p>

          {/* Footer con íconos e información */}
          <div className="flex justify-between items-end mt-auto">
            {/* Iconos */}
            <div className="flex gap-4 items-center text-black">
              <div className="flex items-center gap-1">
                <Image size={20} />
                <span className="text-sm font-poppins">{imageCount}</span>
              </div>

              {hasVideo && (
                <div className="flex items-center gap-1">
                  <Video size={20} />
                  <span className="text-sm font-poppins">1</span>
                </div>
              )}
            </div>

            {/* Link */}
            <Link
              href="/"
              className="px-4 py-2 bg-pastelPink rounded-2xl hover:shadow-md text-black font-semibold font-poppins hover:bg-snow transition-all ease-in-out duration-300"
            >
              Ver más sobre esta publicación
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
