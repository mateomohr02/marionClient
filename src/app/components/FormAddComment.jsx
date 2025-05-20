"use client";

import { useState } from "react";
import { Forward } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addReplyToPostDetail } from "../../../redux/slices/blogSlice";

const FormAddComment = ({ postId, parentId = null, onCancel }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Para realizar un comentario necesita iniciar sesión.");
      router.push("/areaPersonal");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/blog/add-comment/${postId}`,
        { parentId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (result.status === "success" && result.data) {
        // Actualizar redux con el nuevo comentario o respuesta
        dispatch(addReplyToPostDetail(result.data));
        setContent("");
        setFocused(false);
        if (onCancel) onCancel();
      } else {
        alert("Error al comentar.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al comentar.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setContent("");
    setFocused(false);
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mt-6">
      <div className="flex-1">
        <textarea
          onFocus={() => setFocused(true)}
          className="w-full p-2 resize-none border-b border-black bg-transparent text-black focus:outline-none focus:border-black transition-all min-h-[40px]"
          rows={focused ? 3 : 1}
          placeholder={parentId ? "Añade tu respuesta" : "Añade un comentario"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {(focused || content) && (
          <div className="flex justify-end mt-2 gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-1 text-sm font-medium text-black hover:text-black transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!content.trim() || loading}
              className={`flex items-center gap-1 bg-black text-white px-4 py-1.5 text-sm font-medium rounded-full hover:opacity-90 transition-all ${
                !content.trim() || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Forward size={16} />
              Comentar
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormAddComment;
