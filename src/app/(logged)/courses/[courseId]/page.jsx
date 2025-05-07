'use client'

import { useGetCourseLessons } from "../../../../../hooks/useGetCourseLessons"; // ajustá la ruta
import { useParams } from "next/navigation";

const page = () => {
    const params = useParams()
    const paramsId = params.courseId;
  const { lessons, loading, error } = useGetCourseLessons(paramsId);

  if (loading) return <p>Cargando lecciones...</p>;
  if (error) return <p>Error al cargar lecciones</p>;

  return (  
    <div>
      <h1>Lecciones del curso</h1>
      <ul>
        {lessons?.map((lesson) =>           
        (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default page;
