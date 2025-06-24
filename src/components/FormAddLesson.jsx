"use client";

import { useState } from "react";
import useFetchCourses from "@/hooks/useFetchCourses";
import axios from "axios";
import { Plus } from "lucide-react";
import LessonCard from "./profile/LessonCard";
import { useLocale } from "next-intl";

const FormAddLesson = () => {
  const locale = useLocale();
  const { courses, loading, error } = useFetchCourses();
  const [courseId, setCourseId] = useState("");

  const [titleES, setTitleES] = useState("");
  const [contentES, setContentES] = useState([]);

  const [showGerman, setShowGerman] = useState(false);
  const [titleDE, setTitleDE] = useState("");
  const [contentDE, setContentDE] = useState([]);

  const uploadVideoToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "clases-marion");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error al subir video:", error);
      return null;
    }
  };

  const createHandlers = (lang) => {
    const blocks = lang === "es" ? contentES : contentDE;
    const setBlocks = lang === "es" ? setContentES : setContentDE;

    return {
      handleContentChange: (index, field, value) => {
        const updated = [...blocks];
        updated[index][field] = value;
        setBlocks(updated);
      },
      handleSectionChange: (index, subField, value) => {
        const updated = [...blocks];
        updated[index][subField] = value;
        setBlocks(updated);
      },
      handleSectionInnerChange: (index, innerIndex, field, value) => {
        const updated = [...blocks];
        updated[index].value[innerIndex][field] = value;
        setBlocks(updated);
      },
      addBlock: (type) => {
        const updated = [...blocks];
        if (type === "section") {
          updated.push({
            contentType: "section",
            subtitle: "",
            qImages: "0",
            value: [{ contentType: "text", value: "" }],
          });
        } else {
          updated.push({ contentType: type, value: "" });
        }
        setBlocks(updated);
      },
      addSectionInnerBlock: (index, type) => {
        const updated = [...blocks];
        updated[index].value.push({ contentType: type, value: "" });
        if (type === "image") {
          updated[index].qImages = (parseInt(updated[index].qImages) || 0) + 1;
        }
        setBlocks(updated);
      },
      removeBlock: (index) => {
        const updated = blocks.filter((_, i) => i !== index);
        setBlocks(updated);
      },
      removeSectionInnerBlock: (index, innerIndex) => {
        const updated = [...blocks];
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
        setBlocks(updated);
      },
      blocks,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const lessonData = {
      courseId,
      title: { es: titleES, de: titleDE },
      content: { es: contentES, de: contentDE },
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/lessons/`,
        lessonData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Lección creada con éxito.");
      setCourseId("");
      setTitleES("");
      setTitleDE("");
      setContentES([]);
      setContentDE([]);
      setShowGerman(false);
    } catch (err) {
      alert("Error al crear la lección.");
      console.error(err);
    }
  };

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>{error}</p>;

  const renderContentEditor = (lang, title, setTitle, handlers) => (
    <div className="mt-4">
      <h3 className="text-lg font-bold text-center">
        Contenido en {lang === "es" ? "Español" : "Alemán"}
      </h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={`Título en ${lang === "es" ? "Español" : "Alemán"}`}
        className="p-2 border rounded w-full my-2"
      />

      {handlers.blocks.map((block, index) => (
        <div key={index} className="border p-2 rounded my-2">
          <label className="text-sm text-gray-600">
            {block.contentType.toUpperCase()}
          </label>
          {block.contentType === "text" && (
            <textarea
              value={block.value}
              onChange={(e) =>
                handlers.handleContentChange(index, "value", e.target.value)
              }
              className="p-2 border rounded w-full"
              placeholder="Texto"
            />
          )}
          {block.contentType === "image" && (
            <input
              type="text"
              value={block.value}
              onChange={(e) =>
                handlers.handleContentChange(index, "value", e.target.value)
              }
              className="p-2 border rounded w-full"
              placeholder="URL de imagen"
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
                    handlers.handleContentChange(index, "value", url);
                  }
                }}
                className="p-2 border rounded w-full"
              />
              {block.value && (
                <video src={block.value} controls className="w-full max-h-64" />
              )}
            </div>
          )}
          {block.contentType === "section" && (
            <>
              <input
                value={block.subtitle}
                onChange={(e) =>
                  handlers.handleSectionChange(
                    index,
                    "subtitle",
                    e.target.value
                  )
                }
                placeholder="Subtítulo"
                className="p-2 border rounded w-full my-1"
              />
              {block.value.map((inner, i) => (
                <div key={i} className="ml-4">
                  {inner.contentType === "text" && (
                    <textarea
                      value={inner.value}
                      onChange={(e) =>
                        handlers.handleSectionInnerChange(
                          index,
                          i,
                          "value",
                          e.target.value
                        )
                      }
                      className="p-2 border rounded w-full my-1"
                      placeholder="Texto"
                    />
                  )}
                  {inner.contentType === "image" && (
                    <input
                      type="text"
                      value={inner.value}
                      onChange={(e) =>
                        handlers.handleSectionInnerChange(
                          index,
                          i,
                          "value",
                          e.target.value
                        )
                      }
                      className="p-2 border rounded w-full my-1"
                      placeholder="URL de imagen"
                    />
                  )}
                  <button
                    type="button"
                    className="text-red-500 text-xs"
                    onClick={() => handlers.removeSectionInnerBlock(index, i)}
                  >
                    Eliminar bloque
                  </button>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                {["text", "image"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handlers.addSectionInnerBlock(index, type)}
                    className="px-2 py-1 border rounded text-blue-600"
                  >
                    + {type}
                  </button>
                ))}
              </div>
            </>
          )}
          <button
            type="button"
            className="text-red-500 text-xs mt-2"
            onClick={() => handlers.removeBlock(index)}
          >
            Eliminar bloque
          </button>
        </div>
      ))}

      <div className="flex gap-2 my-2">
        {["text", "image", "video", "section"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => handlers.addBlock(type)}
            className="px-2 py-1 border rounded text-blue-600"
          >
            + {type}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow-md max-w-5xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Añadir Clase</h2>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="p-2 border rounded mb-4 w-full"
        >
          <option value="">Seleccionar curso</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {locale === "de" ? course.name.de : course.name.es}
            </option>
          ))}
        </select>

        {renderContentEditor("es", titleES, setTitleES, createHandlers("es"))}

        {!showGerman && (
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setShowGerman(true)}
          >
            + Añadir traducción al alemán
          </button>
        )}

        {showGerman && (
          <>
            <hr className="mt-6" />
            {renderContentEditor(
              "de",
              titleDE,
              setTitleDE,
              createHandlers("de")
            )}
          </>
        )}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Guardar Lección
        </button>
      </form>

      <h3 className="text-xl font-semibold text-center mt-6">
        Vista Previa (Español)
      </h3>
      <LessonCard lesson={{ title: titleES, content: contentES }} />
      {showGerman && (
        <>
          <h3 className="text-xl font-semibold text-center mt-6">
            Vista Previa (Alemán)
          </h3>
          <LessonCard lesson={{ title: titleDE, content: contentDE }} />
        </>
      )}
    </>
  );
};

export default FormAddLesson;
