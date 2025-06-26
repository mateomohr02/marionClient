"use client";

import { useLocale, useTranslations } from 'next-intl';
import Loading from "@/components/Loading";
import useFetchCourses from "@/hooks/useFetchCourses";
import CourseCard from "@/components/CourseCard";
import { motion } from "framer-motion";
import Error from "@/components/Error";


const CoursesPage = () => {
  const t = useTranslations("Cursos");
  const { courses, loading, error } = useFetchCourses();
  const locale = useLocale();
  
  return (
    <motion.div
      className="w-full flex flex-col gap-10 pt-10 min-h-[calc(100vh-8rem)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    > 

      {loading && <Loading/>}
      {error && <p className="text-red-500"><Error msj={t("Page.Error")}/></p>}
      {!loading && courses.length === 0 && (
        <Error msj={t("Page.NoCourses")}/>
      )}

      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} locale={locale}/>
      ))}
    </motion.div>
  );
};

export default CoursesPage;
