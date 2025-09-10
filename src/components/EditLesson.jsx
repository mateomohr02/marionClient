"use client";

import { useEffect, useState } from "react";
import useFetchCourses from "@/hooks/useFetchCourses";
import { useLocale } from "next-intl";
import axios from "axios";

const EditLesson = () => {
  const locale = useLocale();

  // Obtener los cursos existentes
  const { courses, loading, error } = useFetchCourses({
    messages: {
      noRecord: "No se encontraron cursos",
      error: "Error al cargar los cursos",
    },
  });

  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [selectedLessonId, setSelectedLessonId] = useState(undefined);
  const [courseLessons, setCourseLessons] = useState([]);
  const [titleES, setTitleES] = useState("");
  const [titleDE, setTitleDE] = useState("");
  const [contentES, setContentES] = useState([]);
  const [contentDE, setContentDE] = useState([]);
  const [courseId, setCourseId] = useState(null);

  // === Handlers (igual que en FormAddLesson) ===
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

  // === Fetch de clases del curso seleccionado ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!selectedCourse) return;

    const fetchlessons = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/lessons/?name=${selectedCourse}&lang=${locale}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourseLessons(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchlessons();
  }, [selectedCourse, locale]);

  // === Fetch de contenido de clase seleccionada ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!selectedLessonId) return;

    const fetchLessonContent = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ROUTE}/api/lessons/detail/${selectedLessonId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.data;
        setTitleES(data.title.es || "");
        setTitleDE(data.title.de || "");
        setContentES(data.content.es || []);
        setContentDE(data.content.de || []);
        setCourseId(data.courseId || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLessonContent();
  }, [selectedLessonId]);

  // === Renderizador dinámico de bloques (igual que en creación) ===
  // === Renderizador dinámico de bloques (igual que en creación) ===
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
                type="text"
                value={block.value}
                onChange={(e) =>
                  handlers.handleContentChange(index, "value", e.target.value)
                }
                className="p-2 border rounded w-full"
                placeholder="URL de video"
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

      {/* 🔥 Botones para agregar bloques nuevos */}
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

  // === Submit edición ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log(
      selectedLessonId,
      titleES,
      titleDE,
      contentES,
      contentDE,
      selectedCourse,
      "DATA TO SUBMIT"
    );

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_ROUTE}/api/lessons/${selectedLessonId}`,
        {
          id: selectedLessonId,
          title: { es: titleES, de: titleDE },
          content: { es: contentES, de: contentDE },
          courseId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Clase actualizada correctamente");
    } catch (err) {
      console.error(err, "ERROR");
      alert("Error al actualizar la clase");
    }
  };

  // === UI ===
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white rounded shadow-md max-w-5xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Modificar Contenido de la Clase
        </h2>

        {/* Selector de curso */}
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="p-2 border rounded mb-4 w-full"
        >
          <option value="">Seleccionar curso</option>
          {courses.map((course) => (
            <option key={course.id} value={course.slug}>
              {locale === "de" ? course.name.de : course.name.es}
            </option>
          ))}
        </select>

        {/* Selector de lección */}
        {courseLessons.length > 0 && (
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="p-2 border rounded mb-4 w-full"
          >
            <option value="">Seleccionar Clase</option>
            {courseLessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {locale === "de" ? lesson.title.de : lesson.title.es}
              </option>
            ))}
          </select>
        )}

        {/* Formulario de edición */}
        {selectedLessonId && (
          <>
            {renderContentEditor(
              "es",
              titleES,
              setTitleES,
              createHandlers("es")
            )}
            {renderContentEditor(
              "de",
              titleDE,
              setTitleDE,
              createHandlers("de")
            )}

            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              Guardar Cambios
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditLesson;
