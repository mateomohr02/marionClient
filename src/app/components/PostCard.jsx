import React from "react";
import Link from "next/link";
import { ArrowRight, Image, Video } from "lucide-react";
import { usePathname } from "next/navigation";

const PostCard = ({ post }) => {
  const pathname = usePathname();

  const contentPreview = (post.content || []).slice(0, 3);
  const imageCount =
    post.content?.filter((c) => c.contentType === "image" && c.value?.trim())
      .length || 0;
  const hasVideo = post.content?.some(
    (c) => c.contentType === "video" && c.value?.trim()
  );

  let showingText = true;

  return (
    <div className="w-full my-6 px-4 md:px-0">
      <div className="relative flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-25 w-full max-w-4xl mx-auto rounded-lg"></div>

        <div className="relative flex flex-col gap-4 z-10 w-full max-w-4xl p-4 sm:p-6 min-h-[250px] shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold font-poppins text-black">
            {post.title}
          </h2>

          {post.User?.name && (
            <p className="text-sm sm:text-base text-black font-poppins -mt-4">
              Publicación de:{" "}
              <span className="font-medium">{post.User.name}</span>
            </p>
          )}

          {contentPreview.map((block, i) => {
            if (block.contentType === "text" && showingText) {
              showingText = false;
              return (
                <p
                  key={i}
                  className="text-sm sm:text-base font-poppins text-black break-words"
                >
                  {block.value.length > 250
                    ? `${block.value.slice(0, 250)}...`
                    : block.value}
                </p>
              );
            }
            return null;
          })}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-auto gap-4 sm:gap-0">
            <div className="flex gap-4 items-center text-black">
              {imageCount > 0 && (
                <div className="flex items-center gap-1">
                  <Image size={20} />
                  <span className="text-sm font-poppins">{imageCount}</span>
                </div>
              )}

              {hasVideo && (
                <div className="flex items-center gap-1">
                  <Video size={20} />
                  <span className="text-sm font-poppins">1</span>
                </div>
              )}
            </div>

            <Link
              href={`${pathname}/${post.id}`}
              className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
            >
              {/* Fondo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />

              {/* Contenido del botón */}
              <span className="relative z-10 flex items-center gap-2 px-6 py-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
                <ArrowRight size={18} />
                Ver publicación
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
