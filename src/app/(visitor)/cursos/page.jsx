"use client";

import Loading from "@/app/components/Loading";
import useFetchCourses from "../../../../hooks/useFetchCourses";
import CourseCard from "@/app/components/CourseCard";
import { motion } from "framer-motion";

const CoursesPage = () => {
  const { courses, loading, error } = useFetchCourses();

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <motion.div
      className="w-full flex flex-col gap-10 pt-10 min-h-[calc(100vh-8rem)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </motion.div>
  );
};

export default CoursesPage;
