"use client";

import Loading from "@/app/components/Loading";
import useFetchCourses from "../../../../hooks/useFetchCourses";
import CourseCard from "@/app/components/CourseCard";

const CoursesPage = () => {
  const { courses, loading, error } = useFetchCourses();

  if (loading) return <Loading/>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full flex flex-col gap-10 pt-10 min-h-[calc(100vh-8rem)]">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  );
};

export default CoursesPage;
