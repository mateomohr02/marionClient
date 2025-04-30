"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import useAddComment from "../../../hooks/useAddComment";

const FormAddComment = ( { postId } ) => {

  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState("");
  
  const handleSubmit = async (e) => {
    
  };

  const handleCancel = () => {
    setContent("");
    setFocused(false);
  };

  

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mt-6">
      {/* Campo de comentario y botones */}
      <div className="flex-1">
        <textarea
          onFocus={() => setFocused(true)}
          className="w-full p-2 resize-none border-b border-black bg-transparent text-black focus:outline-none focus:border-black transition-all min-h-[40px]"
          rows={focused ? 3 : 1}
          placeholder="Añade un comentario..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Acciones que aparecen al escribir */}
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
              className={`flex items-center gap-1 bg-black text-white px-4 py-1.5 text-sm font-medium rounded-full hover:opacity-90 transition-all ${
                !content.trim() || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!content.trim()}
            >
              <Send size={16} />
              Comentar
            </button>
          </div>
        )}
        
      </div>
    </form>
  );
};

export default FormAddComment;
