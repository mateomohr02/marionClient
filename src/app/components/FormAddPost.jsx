'use client'

import { useState } from 'react';
import useAddPost from '../../../hooks/useAddPost';

const FormAddPost = () => {
  const { addPost, loading, error, success } = useAddPost();
  const [form, setForm] = useState({
    title: '',
    content: '',
    videoUrl: '',
    imageUrls: ['']
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...form.imageUrls];
    newImageUrls[index] = value;
    setForm({ ...form, imageUrls: newImageUrls });
  };

  const addImageField = () => {
    setForm({ ...form, imageUrls: [...form.imageUrls, ''] });
  };

  const removeImageField = (index) => {
    const newImageUrls = form.imageUrls.filter((_, i) => i !== index);
    setForm({ ...form, imageUrls: newImageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addPost(form);
    if (response?.data?.status === 'success') {
      alert('Publicación creada con éxito.');
      setForm({
        title: '',
        content: '',
        videoUrl: '',
        imageUrls: ['']
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input name="title" placeholder="Título" value={form.title} onChange={handleChange} className="p-2 border rounded" />
      <textarea name="content" placeholder="Contenido" value={form.content} onChange={handleChange} className="p-2 border rounded" />
      <input name="videoUrl" placeholder="URL del video (opcional)" value={form.videoUrl} onChange={handleChange} className="p-2 border rounded" />

      <div className="flex flex-col gap-2">
        <p className="font-medium">URLs de imágenes (opcional):</p>
        {form.imageUrls.map((url, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={`Imagen ${index + 1}`}
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              className="p-2 border rounded w-full"
            />
            {form.imageUrls.length > 1 && (
              <button type="button" onClick={() => removeImageField(index)} className="text-red-500 font-bold">
                ✕
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addImageField} className="text-blue-600 underline text-sm self-start">
          + Agregar otra imagen
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
