"use client";

import { useState } from "react";
import useFetchCourses from "@/hooks/useFetchCourses";
import axios from "axios";
import { Plus } from "lucide-react";
import LessonCard from "./profile/LessonCard";

const FormAddLesson = () => {
  const { courses, loading, error } = useFetchCourses();
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);

  const uploadVideoToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "clases-marion");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error al subir video:", error);
      return null;
    }
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...contentBlocks];
    updated[index][field] = value;
    setContentBlocks(updated);
  };

  const handleSectionChange = (index, subField, value) => {
    const updated = [...contentBlocks];
    updated[index][subField] = value;
    setContentBlocks(updated);
  };

  const handleSectionInnerChange = (index, innerIndex, field, value) => {
    const updated = [...contentBlocks];
    updated[index].value[innerIndex][field] = value;
    setContentBlocks(updated);
  };

  const addBlock = (type) => {
    if (type === "section") {
      setContentBlocks([
        ...contentBlocks,
        {
          contentType: "section",
          subtitle: "",
          qImages: "0",
          value: [{ contentType: "text", value: "" }],
        },
      ]);
    } else {
      setContentBlocks([...contentBlocks, { contentType: type, value: "" }]);
    }
  };

  const addSectionInnerBlock = (index, type) => {
    const updated = [...contentBlocks];
    updated[index].value.push({ contentType: type, value: "" });

    if (type === "image") {
      updated[index].qImages = (parseInt(updated[index].qImages) || 0) + 1;
    }

    setContentBlocks(updated);
  };

  const removeBlock = (index) => {
    const updated = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updated);
  };

  const removeSectionInnerBlock = (index, innerIndex) => {
    const updated = [...contentBlocks];
    const removed = updated[index].value[innerIndex];

    updated[index].value = updated[index].value.filter(
      (_, i) => i !== innerIndex
    );

    if (removed.contentType === "image") {
      updated[index].qImages = Math.max(
        (parseInt(updated[index].qImages) || 1) - 1,
        0
      );
    }

    setContentBlocks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const lessonData = {
      title,
      courseId,
      content: contentBlocks,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/lessons/`,
        lessonData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lección creada con éxito.");
      setTitle("");
      setCourseId("");
      setContentBlocks([]);
    } catch (err) {
      alert("Error al crear la lección.");
      console.error(err);
    }
  };

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full bg-gray-50 p-4 rounded shadow-md max-w-5xl mx-auto"
      >
        <h3 className="mx-auto font-semibold text-xl">Añadir Clase</h3>
        <hr />
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">
            Seleccionar el curso al que pertenece la clase
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Título de la Clase"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />

        {contentBlocks.map((block, index) => (
          <div key={index} className="border p-2 rounded bg-gray-50">
            <label className="text-sm text-gray-600">
              {block.contentType.toUpperCase()}
            </label>

            {block.contentType === "text" && (
              <textarea
                value={block.value}
                onChange={(e) =>
                  handleContentChange(index, "value", e.target.value)
                }
                className="p-2 border rounded w-full"
                placeholder="Texto"
              />
            )}

            {["image"].includes(block.contentType) && (
              <input
                type="text"
                value={block.value}
                onChange={(e) =>
                  handleContentChange(index, "value", e.target.value)
                }
                className="p-2 border rounded w-full"
                placeholder={`URL de ${block.contentType}`}
              />
            )}
            {block.contentType === "video" && (
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const url = await uploadVideoToCloudinary(file);
                    if (url) {
                      handleContentChange(index, "value", url);
                    }
                  }}
                  className="p-2 border rounded w-full"
                />
                {block.value && (
                  <video
                    src={block.value}
                    controls
                    controlsList="nodownload"
                    className="rounded w-full max-h-64"
                  />
                )}
              </div>
            )}

            {block.contentType === "section" && (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={block.subtitle}
                  onChange={(e) =>
                    handleSectionChange(index, "subtitle", e.target.value)
                  }
                  placeholder="Subtítulo"
                  className="p-2 border rounded"
                />
                {block.value.map((inner, innerIndex) => (
                  <div key={innerIndex} className="flex flex-col gap-1 ml-4">
                    <label className="text-xs">{inner.contentType}</label>
                    {inner.contentType === "text" && (
                      <textarea
                        value={inner.value}
                        onChange={(e) =>
                          handleSectionInnerChange(
                            index,
                            innerIndex,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder="Texto"
                        className="p-2 border rounded"
                      />
                    )}
                    {["image"].includes(inner.contentType) && (
                      <input
                        type="text"
                        value={inner.value}
                        onChange={(e) =>
                          handleSectionInnerChange(
                            index,
                            innerIndex,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder={`URL de ${inner.contentType}`}
                        className="p-2 border rounded"
                      />
                    )}
                    {block.contentType === "video" && (
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const url = await uploadVideoToCloudinary(file);
                            if (url) {
                              handleContentChange(index, "value", url);
                            }
                          }}
                          className="p-2 border rounded w-full"
                        />
                        {block.value && (
                          <video
                            src={block.value}
                            controls
                            controlsList="nodownload"
                            className="rounded w-full max-h-64"
                          />
                        )}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => removeSectionInnerBlock(index, innerIndex)}
                      className="text-red-500 text-xs self-end"
                    >
                      Descartar
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addSectionInnerBlock(index, "text")}
                    className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"
                  >
                    <Plus className="p-1" />
                    Añadir Texto
                  </button>

                  <button
                    type="button"
                    onClick={() => addSectionInnerBlock(index, "image")}
                    className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"
                  >
                    <Plus className="p-1" /> Imagen
                  </button>
                  <button
                    type="button"
                    onClick={() => addSectionInnerBlock(index, "video")}
                    className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"
                  >
                    <Plus className="p-1" /> Video
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => removeBlock(index)}
              className="px-2 py-1 flex items-center gap-1 border hover:bg-red-100 text-red-600 hover:border-red-600 rounded transition-all ease-in-out duration-300 mt-2"
            >
              Descartar
            </button>
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addBlock("text")}
            className="px-2 py-1 flex items-center gap-1 border bg-white hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"
          >
            <Plus className="p-1" /> Texto
          </button>
          <button
            type="button"
            onClick={() => addBlock("image")}
            className="px-2 py-1 flex items-center gap-1 border bg-white hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"
          >
            <Plus className="p-1" /> Imagen
          </button>
          <button
            type="button"
            onClick={() => addBlock("video")}
            className="px-2 py-1 flex items-center gap-1 border bg-white hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"
          >
            <Plus className="p-1" /> Video
          </button>
          <button
            type="button"
            onClick={() => addBlock("section")}
            className="px-2 py-1 flex items-center gap-1 border bg-white hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"
          >
            <Plus className="p-1" /> Sección
          </button>
        </div>
        <hr />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Añadir Clase
        </button>
      </form>
      <h3 className="text-2xl font-semibold text-center my-4">
        Vista Previa de la Clase:
      </h3>
      <LessonCard lesson={{ title, content: contentBlocks }} />
    </>
  );
};

export default FormAddLesson;
