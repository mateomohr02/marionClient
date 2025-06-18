"use client";

import { useState } from "react";
import { CornerDownRight } from "lucide-react";
import FormAddComment from "./FormAddComment"; // Ajustá el path si es necesario
import { useTranslations } from "next-intl";

const CommentCard = ({ data, level = 0, postId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Solo aplicar padding hasta el nivel 1
  const paddingLeft = level === 1 ? 20 : 0;

  const t = useTranslations("Blog")

  return (
    <div className="my-4" style={{ paddingLeft }}>
      <p className="font-poppins font-semibold">
        {data.User?.name || "Usuario"}
      </p>
      <div className="mt-2">
        <p className="font-poppins">{data.content}</p>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="font-poppins text-sm hover:bg-snow px-2 py-1 rounded-full flex items-center gap-1"
        >
          <CornerDownRight size={16} />
          {t("CommentCard.Btn1")}
        </button>
      </div>

      {showReplyForm && (
        <FormAddComment
          postId={postId}
          parentId={data.id}
          onCancel={() => setShowReplyForm(false)} // ✅ cerrar al enviar o cancelar
        />
      )}

      {data.replies && data.replies.length > 0 && (
        <div className="mt-4">
          {data.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              data={reply}
              level={level + 1}
              postId={postId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
