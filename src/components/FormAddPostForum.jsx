"use client";

import { useState } from "react";
import useAddPost from "@/hooks/useAddPost";
import { Forward } from "lucide-react";
import { useDispatch } from "react-redux";
import { addPostToForum } from "@/redux/slices/blogSlice"; // <--- NUEVO
import { useTranslations } from "next-intl";


const FormAddPostForum = ({ courseId }) => {

  const t = useTranslations("Lessons");

  const dispatch = useDispatch();
  const { addPost, loading, error, success } = useAddPost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const postData = {
      title: title.trim(),
      content: [{ contentType: "text", value: content.trim() }],
    };

    const response = await addPost(postData, courseId);

    if (response?.status === "success" && response.data) {
      dispatch(addPostToForum(response.data)); 
      setTitle("");
      setContent("");
      setFocused(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setFocused(false);
  };

  return (
    <div className="w-full my-6 px-4 md:px-0">
      <div className="relative flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gradientRight to-gradientLeft opacity-30 w-full max-w-4xl mx-auto rounded-2xl"></div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-4xl rounded-2xl p-6 sm:p-8 shadow-sm backdrop-blur flex flex-col gap-4"
        >
          <h3 className="text-xl sm:text-2xl font-semibold font-poppins text-black">{t("Forum.CreatePost")}</h3>

          <input
            type="text"
            placeholder={t("Forum.PlaceholderTitle")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-b border-black bg-transparent text-black focus:outline-none focus:border-black transition-all"
          />

          <textarea
            onFocus={() => setFocused(true)}
            className="w-full p-2 resize-none border-b border-black bg-transparent text-black focus:outline-none focus:border-black transition-all min-h-[40px]"
            rows={focused ? 4 : 2}
            placeholder={t("Forum.PlaceholderText")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {(focused || content || title) && (
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-1 text-sm font-medium text-black hover:text-black transition-all"
              >
                {t("Forum.CancelBtn")}
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !content.trim() || loading}
                className={`flex items-center gap-1 bg-black text-white px-4 py-1.5 text-sm font-medium rounded-full hover:opacity-90 transition-all ${
                  !title.trim() || !content.trim() || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Forward size={16} />
                {t("Forum.SubmitBtn")}
              </button>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-1">{t("Forum.AlertMsgError")}</p>}
          {success && <p className="text-green-500 text-sm mt-1">{t("Forum.AlertMsgSuccess")}</p>}
        </form>
      </div>
    </div>
  );
};

export default FormAddPostForum;
