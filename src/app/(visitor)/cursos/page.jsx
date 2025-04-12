'use client'

import useFetchCourses from '../../../../hooks/useFetchCourses'
import CourseCard from '@/app/components/CourseCard'

const CoursesPage = () => {
  const { courses, loading, error } = useFetchCourses()

  if (loading) return <p>Cargando cursos...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="w-full flex flex-col gap-10 pt-10">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  )
}

export default CoursesPage
