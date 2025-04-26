import React from "react";
import Link from "next/link";
import { Image, Video } from "lucide-react";

const PostCard = ({ post }) => {
  const contentPreview = (post.content || []).slice(0, 3); // Limita la vista previa
  const imageCount = post.content?.filter(c => c.contentType === 'image' && c.value?.trim()).length || 0;
  const hasVideo = post.content?.some(c => c.contentType === 'video' && c.value?.trim());

  let showingText = true;

  return (
    <div className="w-full my-6">
      <div className="relative w-full flex justify-center p-1">
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-30 w-[calc(50vw)] m-auto rounded-2xl"></div>

        <div className="relative flex flex-col gap-4 z-10 max-w-4xl w-full rounded-lg p-6 min-h-[250px]">
          <h2 className="text-2xl font-semibold font-poppins text-black">{post.title}</h2>

          {contentPreview.map((block, i) => {
            if (block.contentType === 'text' && showingText) {
              showingText = false;
              return (
                <p key={i} className="text-base font-poppins text-black break-words">
                  {block.value.length > 250 ? `${block.value.slice(0, 250)}...` : block.value}
                </p>
              );
            }
            return null;
          })}

          <div className="flex justify-between items-end mt-auto">
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
              href={`/comunidad/${post.id}`}
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
