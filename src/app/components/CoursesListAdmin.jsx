import useFetchCourses from '../../../hooks/useFetchCourses';

const CoursesListAdmin = () => {
  const { courses, loading, error } = useFetchCourses();

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {courses.map(course => (
        <div key={course.id}>{course.name}</div>
      ))}
    </ul>
  );
};

export default CoursesListAdmin;
