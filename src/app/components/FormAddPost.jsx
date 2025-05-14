'use client'

import { useState } from 'react';
import useAddPost from '../../../hooks/useAddPost';
import { Plus } from "lucide-react";



const FormAddPost = () => {
  const { addPost, loading, error, success } = useAddPost();
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState([
    { contentType: 'text', value: '' }
  ]);

  const handleContentChange = (index, field, value) => {
    const updated = [...contentBlocks];
    updated[index][field] = value;
    setContentBlocks(updated);
  };

  const addBlock = (type) => {
    setContentBlocks([...contentBlocks, { contentType: type, value: '' }]);
  };

  const removeBlock = (index) => {
    const updated = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content: contentBlocks.filter(block => block.value.trim() !== '')
    };
    const response = await addPost(postData);
    if (response?.data?.status === 'success') {
      alert('Publicación creada con éxito.');
      setTitle('');
      setContentBlocks([{ contentType: 'text', value: '' }]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full bg-gray-50 p-4 rounded shadow-md max-w-5xl mx-auto">
      <h3 className='mx-auto font-semibold text-xl'>Añadir Publicación al Blog</h3>
       <hr />
      <input
        name="title"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
      />

      {contentBlocks.map((block, index) => (
        <div key={index} className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">{block.contentType.toUpperCase()}</label>
          {block.contentType === 'text' && (
            <textarea
              value={block.value}
              onChange={(e) => handleContentChange(index, 'value', e.target.value)}
              className="p-2 border rounded"
              placeholder="Texto"
            />
          )}
          {block.contentType === 'image' && (
            <input
              type="text"
              value={block.value}
              onChange={(e) => handleContentChange(index, 'value', e.target.value)}
              className="p-2 border rounded"
              placeholder="URL de imagen"
            />
          )}
          {block.contentType === 'video' && (
            <input
              type="text"
              value={block.value}
              onChange={(e) => handleContentChange(index, 'value', e.target.value)}
              className="p-2 border rounded"
              placeholder="URL de video"
            />
          )}
          <button
            type="button"
            onClick={() => removeBlock(index)}
            className="text-red-500 text-sm self-end"
          >
            Descartar
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button type="button" onClick={() => addBlock('text')} className="px-2 bg-white py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300">
          <Plus className="p-1" /> Texto
        </button>
        <button type="button" onClick={() => addBlock('image')} className="px-2 bg-white py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300">
          <Plus className="p-1" /> Imagen
        </button>
        <button type="button" onClick={() => addBlock('video')} className="px-2 bg-white py-1 flex items-center gap-1 border hover:bg-blue-100 text-blue-600 hover:border-blue-600 rounded transition-all ease-in-out duration-300">
          <Plus className="p-1" /> Video
        </button>
      </div>
       <hr />
      <button type="submit" className="hover:bg-blue-600 bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
        {loading ? 'Publicando...' : 'Publicar'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Publicación agregada exitosamente</p>}
    </form>
  );
};

export default FormAddPost;

