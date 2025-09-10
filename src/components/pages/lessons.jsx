"use client";

import CourseNavBar from "@/components/CourseNavBar";
import { useGetCourseLessons } from "@/hooks/useGetCourseLessons";
import { useParams } from "next/navigation";
import { motion } from 'framer-motion';
import LessonCard from "@/components/profile/LessonCard";
import LessonFooterNavigation from "@/components/LessonFooterNavigation";
import Loading from "@/components/Loading";
import { useLocale, useTranslations } from "next-intl";
import Error from "@/components/Error";

const Lessons = () => {
  const t = useTranslations("Lessons");
  const locale = useLocale();
  const params = useParams();
  const courseSlug = params.courseName
  const { lessons, loading, error } = useGetCourseLessons(courseSlug, locale);

  return (
  <motion.div
    key={params.courseName}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="min-h-[calc(100vh-8rem)]"
  >
    {loading ? (
      <Loading />
    ) : error ? (
      <Error msj={t("Page.Error")} />
    ) : lessons.length === 0 ? (
      <Error msj={t("Page.NoLessons")} />
    ) : (
      <>
        <CourseNavBar locale={locale} />
        <LessonCard />
        <LessonFooterNavigation />
        
      </>
    )}
  </motion.div>
);
};

export default Lessons;
