'use client';

import { useState } from 'react';
import useAddCourse from '../../../hooks/useAddCourse';
import { Plus } from 'lucide-react';

const FormAddCourse = () => {
  const { addCourse, loading, error, success } = useAddCourse();
  const [form, setForm] = useState({
    name: '',
    price: '',
    poster: '',
    description: '',
  });

  const [contentBlocks, setContentBlocks] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...contentBlocks];
    updated[index][field] = value;
    setContentBlocks(updated);
  };

  const addBlock = (type) => {
    if (type === 'section') {
      setContentBlocks([
        ...contentBlocks,
        {
          contentType: 'section',
          subtitle: '',
          qImages: 0,
          value: [{ contentType: 'text', value: '' }],
        },
      ]);
    } else {
      setContentBlocks([
        ...contentBlocks,
        { contentType: type, value: '' },
      ]);
    }
  };

  const addSectionInnerBlock = (index, type) => {
    const updated = [...contentBlocks];
    updated[index].value.push({ contentType: type, value: '' });
    if (type === 'image') {
      updated[index].qImages += 1;
    }
    setContentBlocks(updated);
  };

  const removeBlock = (index) => {
    const updated = [...contentBlocks];
    updated.splice(index, 1);
    setContentBlocks(updated);
  };

  const removeSectionInnerBlock = (index, innerIndex) => {
    const updated = [...contentBlocks];
    const removed = updated[index].value[innerIndex];
    updated[index].value.splice(innerIndex, 1);
    if (removed.contentType === 'image') {
      updated[index].qImages -= 1;
    }
    setContentBlocks(updated);
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...contentBlocks];
    updated[index][field] = value;
    setContentBlocks(updated);
  };

  const handleSectionInnerChange = (index, innerIndex, field, value) => {
    const updated = [...contentBlocks];
    updated[index].value[innerIndex][field] = value;
    setContentBlocks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      ...form,
      content: contentBlocks,
    };

    const response = await addCourse(courseData);

    if (response?.data?.status === 'success') {
      alert('Curso agregado con éxito.');
      setForm({ name: '', price: '', description: '', poster:''});
      setContentBlocks([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full bg-gray-50 p-4 rounded shadow-md max-w-5xl mx-auto">
      <h3 className="mx-auto font-semibold text-xl">Añadir Curso</h3>
      <hr />
      <input name="name" placeholder="Nombre del curso" value={form.name || ''} onChange={handleChange} className="p-2 border rounded" />
      <input name="price" type="number" placeholder="Precio" value={form.price || ''} onChange={handleChange} className="p-2 border rounded" />
      <input name="poster" placeholder="Link Imágen Portada 300x300px" value={form.poster || ''} onChange={handleChange} className="p-2 border rounded" />
      <textarea name="description" placeholder="Descripción" value={form.description || ''} onChange={handleChange} className="p-2 border rounded" />
      
      <hr />
      <h3 className="mx-auto font-semibold text-xl">Contenido de la Clase de Presentación</h3>
      <hr />

      {contentBlocks.map((block, index) => (
        <div key={index} className="border p-2 rounded bg-white">
          <label className="text-sm text-gray-600">{block.contentType.toUpperCase()}</label>

          {block.contentType === 'text' && (
            <textarea value={block.value} onChange={(e) => handleContentChange(index, 'value', e.target.value)} className="p-2 border rounded w-full" placeholder="Texto" />
          )}

          {['image', 'video'].includes(block.contentType) && (
            <input type="text" value={block.value} onChange={(e) => handleContentChange(index, 'value', e.target.value)} className="p-2 border rounded w-full" placeholder={`URL de ${block.contentType}`} />
          )}

          {block.contentType === 'section' && (
            <>
              <input type="text" value={block.subtitle || ''} onChange={(e) => handleSectionChange(index, 'subtitle', e.target.value)} placeholder="Subtítulo" className="p-2 border rounded mb-2" />
              {block.value.map((inner, innerIndex) => (
                <div key={innerIndex} className="ml-4 mb-2">
                  <label className="text-xs">{inner.contentType}</label>
                  {inner.contentType === 'text' && (
                    <textarea value={inner.value || ''} onChange={(e) => handleSectionInnerChange(index, innerIndex, 'value', e.target.value)} placeholder="Texto" className="p-2 border rounded w-full" />
                  )}
                  {['image', 'video'].includes(inner.contentType) && (
                    <input type="text" value={inner.value || ''} onChange={(e) => handleSectionInnerChange(index, innerIndex, 'value', e.target.value)} placeholder={`URL de ${inner.contentType}`} className="p-2 border rounded w-full" />
                  )}
                  <button type="button" onClick={() => removeSectionInnerBlock(index, innerIndex)} className="text-red-500 text-xs mt-1">Descartar</button>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => addSectionInnerBlock(index, 'text')} className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"><Plus className="p-1" /> Texto</button>
                <button type="button" onClick={() => addSectionInnerBlock(index, 'image')} className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"><Plus className="p-1" /> Imagen</button>
                <button type="button" onClick={() => addSectionInnerBlock(index, 'video')} className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"><Plus className="p-1" /> Video</button>
              </div>
            </>
          )}

          <button type="button" onClick={() => removeBlock(index)} className="text-red-600 mt-2 text-sm">Descartar</button>
        </div>
      ))}

      <div className="flex gap-2">
        <button type="button" onClick={() => addBlock('text')} className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"><Plus className="p-1" /> Texto</button>
        <button type="button" onClick={() => addBlock('image')} className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"><Plus className="p-1" /> Imagen</button>
        <button type="button" onClick={() => addBlock('video')} className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"><Plus className="p-1" /> Video</button>
        <button type="button" onClick={() => addBlock('section')} className="px-2 py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300"><Plus className="p-1" /> Sección</button>
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded max-w-xs mx-auto hover:bg-blue-600" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar Curso'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Curso agregado exitosamente</p>}
    </form>
  );
};

export default FormAddCourse;
