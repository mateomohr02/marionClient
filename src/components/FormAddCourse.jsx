"use client";

import { useState } from "react";
import useAddCourse from "@/hooks/useAddCourse";
import { Plus } from "lucide-react";
import LessonCard from "@/components/profile/LessonCard";

const FormAddCourse = () => {
  const { addCourse, loading, error, success } = useAddCourse();
  const [form, setForm] = useState({
    name: { es: "", de: "" },
    price: { ars: "", eur: "" },
    poster: { es: "", de: "" },
    description: { es: "", de: "" },
  });

  const [contentBlocksEs, setContentBlocksEs] = useState([]);
  const [contentBlocksDe, setContentBlocksDe] = useState([]);
  const [showGermanFields, setShowGermanFields] = useState(false);

  const handleLangChange = (e) => {
    const [field, lang] = e.target.name.split(".");
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: e.target.value,
      },
    }));
  };

  const handleContentChange = (blocks, setBlocks, index, field, value) => {
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  };

  const addBlock = (blocks, setBlocks, type) => {
    if (type === "section") {
      setBlocks([
        ...blocks,
        {
          contentType: "section",
          subtitle: "",
          qImages: 0,
          value: [{ contentType: "text", value: "" }],
        },
      ]);
    } else {
      setBlocks([...blocks, { contentType: type, value: "" }]);
    }
  };

  const addSectionInnerBlock = (blocks, setBlocks, index, type) => {
    const updated = [...blocks];
    updated[index].value.push({ contentType: type, value: "" });
    if (type === "image") updated[index].qImages += 1;
    setBlocks(updated);
  };

  const removeBlock = (blocks, setBlocks, index) => {
    const updated = [...blocks];
    updated.splice(index, 1);
    setBlocks(updated);
  };

  const removeSectionInnerBlock = (blocks, setBlocks, index, innerIndex) => {
    const updated = [...blocks];
    const removed = updated[index].value[innerIndex];
    updated[index].value.splice(innerIndex, 1);
    if (removed.contentType === "image") updated[index].qImages -= 1;
    setBlocks(updated);
  };

  const handleSectionChange = (blocks, setBlocks, index, field, value) => {
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  };

  const handleSectionInnerChange = (
    blocks,
    setBlocks,
    index,
    innerIndex,
    field,
    value
  ) => {
    const updated = [...blocks];
    updated[index].value[innerIndex][field] = value;
    setBlocks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      name: form.name,
      price: {
        ars: parseFloat(form.price.ars),
        eur: parseFloat(form.price.eur),
      },
      poster: form.poster,
      description: form.description,
      content: {
        es: contentBlocksEs,
        de: showGermanFields ? contentBlocksDe : [],
      },
    };

    const response = await addCourse(courseData);

    if (response?.data?.status === "success") {
      alert("Curso agregado con éxito.");
      setForm({
        name: { es: "", de: "" },
        price: { ars: "", eur: "" },
        poster: { es: "", de: "" },
        description: { es: "", de: "" },
      });
      setContentBlocksEs([]);
      setContentBlocksDe([]);
      setShowGermanFields(false);
    }
  };

  const renderContentForm = (blocks, setBlocks, lang) => (
    <>
      {blocks.map((block, index) => (
        <div key={index} className="border p-2 rounded bg-white">
          <label className="text-sm text-gray-600">
            {block.contentType.toUpperCase()}
          </label>

          {block.contentType === "text" && (
            <textarea
              value={block.value}
              onChange={(e) =>
                handleContentChange(blocks, setBlocks, index, "value", e.target.value)
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
                handleContentChange(blocks, setBlocks, index, "value", e.target.value)
              }
              className="p-2 border rounded w-full"
              placeholder={`URL de ${block.contentType}`}
            />
          )}

          {block.contentType === "section" && (
            <>
              <input
                type="text"
                value={block.subtitle || ""}
                onChange={(e) =>
                  handleSectionChange(blocks, setBlocks, index, "subtitle", e.target.value)
                }
                placeholder="Subtítulo"
                className="p-2 border rounded mb-2"
              />
              {block.value.map((inner, innerIndex) => (
                <div key={innerIndex} className="ml-4 mb-2">
                  <label className="text-xs">{inner.contentType}</label>
                  {inner.contentType === "text" && (
                    <textarea
                      value={inner.value || ""}
                      onChange={(e) =>
                        handleSectionInnerChange(
                          blocks,
                          setBlocks,
                          index,
                          innerIndex,
                          "value",
                          e.target.value
                        )
                      }
                      placeholder="Texto"
                      className="p-2 border rounded w-full"
                    />
                  )}
                  {["image", "video"].includes(inner.contentType) && (
                    <input
                      type="text"
                      value={inner.value || ""}
                      onChange={(e) =>
                        handleSectionInnerChange(
                          blocks,
                          setBlocks,
                          index,
                          innerIndex,
                          "value",
                          e.target.value
                        )
                      }
                      placeholder={`URL de ${inner.contentType}`}
                      className="p-2 border rounded w-full"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      removeSectionInnerBlock(blocks, setBlocks, index, innerIndex)
                    }
                    className="text-red-500 text-xs mt-1"
                  >
                    Descartar
                  </button>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => addSectionInnerBlock(blocks, setBlocks, index, "text")}
                  className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
                >
                  + Texto
                </button>
                <button
                  type="button"
                  onClick={() => addSectionInnerBlock(blocks, setBlocks, index, "image")}
                  className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
                >
                  + Imagen
                </button>
                <button
                  type="button"
                  onClick={() => addSectionInnerBlock(blocks, setBlocks, index, "video")}
                  className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
                >
                  + Video
                </button>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => removeBlock(blocks, setBlocks, index)}
            className="text-red-600 mt-2 text-sm"
          >
            Descartar
          </button>
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={() => addBlock(blocks, setBlocks, "text")}
          className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
        >
          + Texto
        </button>
        <button
          type="button"
          onClick={() => addBlock(blocks, setBlocks, "image")}
          className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
        >
          + Imagen
        </button>
        <button
          type="button"
          onClick={() => addBlock(blocks, setBlocks, "video")}
          className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
        >
          + Video
        </button>
        <button
          type="button"
          onClick={() => addBlock(blocks, setBlocks, "section")}
          className="px-2 py-1 border rounded text-blue-600 hover:bg-blue-100"
        >
          + Sección
        </button>
      </div>
    </>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full bg-gray-50 p-4 rounded shadow-md max-w-5xl mx-auto"
      >
        <h3 className="mx-auto font-semibold text-xl">Añadir Curso</h3>
        <hr />

        <input name="name.es" placeholder="Nombre del curso (ES)" value={form.name.es} onChange={handleLangChange} className="p-2 border rounded" />
        <input name="price.ars" type="number" placeholder="Precio en ARS" value={form.price.ars} onChange={handleLangChange} className="p-2 border rounded" />
        <input name="price.eur" type="number" placeholder="Precio en EUR" value={form.price.eur} onChange={handleLangChange} className="p-2 border rounded" />
        <input name="poster.es" placeholder="Link Imagen Portada (ES)" value={form.poster.es} onChange={handleLangChange} className="p-2 border rounded" />
        <textarea name="description.es" placeholder="Descripción (ES)" value={form.description.es} onChange={handleLangChange} className="p-2 border rounded" />

        {!showGermanFields && (
          <button type="button" onClick={() => setShowGermanFields(true)} className="text-blue-600 underline text-sm w-fit">
            + Agregar versión en alemán
          </button>
        )}

        {showGermanFields && (
          <div className="mt-2 border rounded p-3 bg-white">
            <h4 className="text-md font-semibold text-gray-700 mb-2">Versión Alemán</h4>
            <input name="name.de" placeholder="Nombre del curso (DE)" value={form.name.de} onChange={handleLangChange} className="p-2 border rounded mb-2 w-full" />
            <input name="poster.de" placeholder="Link Imagen Portada (DE)" value={form.poster.de} onChange={handleLangChange} className="p-2 border rounded mb-2 w-full" />
            <textarea name="description.de" placeholder="Descripción (DE)" value={form.description.de} onChange={handleLangChange} className="p-2 border rounded w-full" />
          </div>
        )}

        <hr />
        <h3 className="mx-auto font-semibold text-xl">Contenido de la Clase de Presentación (ES)</h3>
        <hr />
        {renderContentForm(contentBlocksEs, setContentBlocksEs, "es")}

        {showGermanFields && (
          <>
            <hr />
            <h3 className="mx-auto font-semibold text-xl">Contenido de la Clase de Presentación (DE)</h3>
            <hr />
            {renderContentForm(contentBlocksDe, setContentBlocksDe, "de")}
          </>
        )}

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded max-w-xs mx-auto hover:bg-blue-600" disabled={loading}>
          {loading ? "Agregando..." : "Agregar Curso"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Curso agregado exitosamente</p>}
      </form>

      <h3 className="text-xl font-semibold text-center mt-6">Vista Previa (Español)</h3>
      <LessonCard lesson={{ title: form.name.es, content: contentBlocksEs }} />
      <h3 className="text-xl font-semibold text-center mt-6">Vista Previa (Alemán)</h3>
      <LessonCard lesson={{ title: form.name.de, content: contentBlocksDe }} />
    </>
  );
};

export default FormAddCourse;
