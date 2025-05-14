'use client'

import { useState } from 'react';
import useAddCourse from '../../../hooks/useAddCourse';

const FormAddCourse = () => {
  const { addCourse, loading, error, success } = useAddCourse();
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    introVideoUrl: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addCourse(form);
    if (response.data.status === 'success') {
        alert('Curso agregado con éxito.')
        setForm({
            name: '',
            price: '',
            description: '',
            introVideoUrl: ''
          });        
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full bg-gray-50 p-4 rounded shadow-md max-w-5xl mx-auto">
      <h3 className='mx-auto font-semibold text-xl'>Añadir Curso</h3>
       <hr />
      <input name="name" placeholder="Nombre del curso" value={form.name} onChange={handleChange} className="p-2 border rounded" />
      <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} className="p-2 border rounded" />
      <input name="introVideoUrl" placeholder="URL del video introductorio" value={form.introVideoUrl} onChange={handleChange} className="p-2 border rounded" />
      <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="p-2 border rounded" />
       <hr />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar Curso'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Curso agregado exitosamente</p>}
    </form>
  );
};

export default FormAddCourse;