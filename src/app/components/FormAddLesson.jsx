"use client";

import { useState } from "react";
import useFetchCourses from "../../../hooks/useFetchCourses";
import axios from "axios";

const FormAddLesson = () => {
  const { courses, loading, error } = useFetchCourses();
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Seleccionar curso</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Título de la lección"
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

          {["image", "video"].includes(block.contentType) && (
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
                  {["image", "video"].includes(inner.contentType) && (
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
                  <button
                    type="button"
                    onClick={() => removeSectionInnerBlock(index, innerIndex)}
                    className="text-red-500 text-xs self-end"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addSectionInnerBlock(index, "text")}
                  className="text-blue-600 text-sm underline"
                >
                  + Texto
                </button>
                <button
                  type="button"
                  onClick={() => addSectionInnerBlock(index, "image")}
                  className="text-blue-600 text-sm underline"
                >
                  + Imagen
                </button>
                <button
                  type="button"
                  onClick={() => addSectionInnerBlock(index, "video")}
                  className="text-blue-600 text-sm underline"
                >
                  + Video
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => removeBlock(index)}
            className="text-red-500 text-sm mt-2"
          >
            Eliminar bloque
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => addBlock("text")}
          className="text-blue-600 underline text-sm"
        >
          + Texto
        </button>
        <button
          type="button"
          onClick={() => addBlock("image")}
          className="text-blue-600 underline text-sm"
        >
          + Imagen
        </button>
        <button
          type="button"
          onClick={() => addBlock("video")}
          className="text-blue-600 underline text-sm"
        >
          + Video
        </button>
        <button
          type="button"
          onClick={() => addBlock("section")}
          className="text-blue-600 underline text-sm"
        >
          + Sección
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Crear Lección
      </button>
    </form>
  );
};

export default FormAddLesson;
