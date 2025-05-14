"use client";

import CourseNavBar from "@/app/components/CourseNavBar";
import { useGetCourseLessons } from "../../../../../hooks/useGetCourseLessons"; // ajustá la ruta
import { useParams } from "next/navigation";
import LessonCard from "@/app/components/profile/LessonCard";
import LessonFooterNavigation from "@/app/components/LessonFooterNavigation";

const page = () => {
  const params = useParams();
  const paramsId = params.courseId;
  const { lessons, loading, error } = useGetCourseLessons(paramsId);

  if (loading) return <p>Cargando lecciones...</p>;
  if (lessons.length === 0) return <p>Todavía no hay clases para el curso.</p>;


  return (
    <div>
      <CourseNavBar />
      <LessonCard />
      <LessonFooterNavigation/>
    </div>
  );
};

export default page;
