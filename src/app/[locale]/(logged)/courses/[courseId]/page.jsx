"use client";

import CourseNavBar from "@/components/CourseNavBar";
import { useGetCourseLessons } from "@/hooks/useGetCourseLessons"; // ajustá la ruta
import { useParams } from "next/navigation";
import LessonCard from "@/components/profile/LessonCard";
import LessonFooterNavigation from "@/components/LessonFooterNavigation";
import Loading from "@/components/Loading";
import { useLocale } from "next-intl";


const page = () => {
  const locale = useLocale();
  const params = useParams();
  const paramsId = params.courseId;
  const { lessons, loading, error } = useGetCourseLessons(paramsId);

  if (loading) return <Loading/>;
  if (lessons.length === 0) return <p>Todavía no hay clases para el curso.</p>;


  return (
    <div>
      <CourseNavBar locale={locale}/>
      <LessonCard />
      <LessonFooterNavigation/>
    </div>
  );
};

export default page;
