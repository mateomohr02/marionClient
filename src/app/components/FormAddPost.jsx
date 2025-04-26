'use client'

import { useState } from 'react';
import useAddPost from '../../../hooks/useAddPost';

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
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
            Eliminar
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button type="button" onClick={() => addBlock('text')} className="text-blue-600 underline text-sm">
          + Texto
        </button>
        <button type="button" onClick={() => addBlock('image')} className="text-blue-600 underline text-sm">
          + Imagen
        </button>
        <button type="button" onClick={() => addBlock('video')} className="text-blue-600 underline text-sm">
          + Video
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={loading}>
        {loading ? 'Publicando...' : 'Publicar'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Publicación agregada exitosamente</p>}
    </form>
  );
};

export default FormAddPost;

