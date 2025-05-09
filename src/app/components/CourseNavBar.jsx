import { useSelector, useDispatch } from "react-redux";
import {
  setLessonDetail,
  setCurrentLesson,
} from "../../../redux/slices/courseSlice";
import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";

const CourseNavBar = () => {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.course.courseLessons);
  const currentLesson = useSelector((state) => state.course.currentLesson);
  const currentLessonDetail = useSelector((state) => state.course.lessonDetail);
  const courseTitle = useSelector((state) => state.course.courseDetail.name);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null); // ← Para manejar el temporizador

  const handleSelectLesson = (lesson) => {
    dispatch(setCurrentLesson(lesson.id));
    dispatch(setLessonDetail(lesson));
    setDropdownOpen(false);
  };

  const handleBackToFirstLesson = () => {
    const firstLesson = lessons[0];
    dispatch(setCurrentLesson(firstLesson.id));
    dispatch(setLessonDetail(firstLesson));
  };

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const closeDropdownWithDelay = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // 300ms de gracia
  };

  return (
    <div className="w-full py-3 px-8 flex justify-between items-center text-sm font-medium z-10 relative">
      <div className="flex items-center gap-2">
        <button
          onClick={handleBackToFirstLesson}
          className="text-gray-800 font-semibold text-xl hover:underline"
        >
          {courseTitle}
        </button>

        <span>
          <ChevronRight />
        </span>

        <div
          className="relative"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdownWithDelay}
        >
          <button className="text-gray-800 font-semibold hover:underline  text-xl ">
            Clase N° {lessons.findIndex((l) => l.id === currentLesson) + 1}:{" "}
            {currentLessonDetail?.title}
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-300 rounded shadow-lg z-50">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    currentLesson === lesson.id ? "bg-gray-50 font-bold" : ""
                  }`}
                >
                  Clase N° {index + 1}: {lesson.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-[2px] rounded-full bg-gradient-to-r from-gradientLeft to-gradientRight">
        <button className="text-xl text-black font-semibold px-4 py-2 rounded-full bg-snow/70 hover:bg-snow transition-all ease-in-out duration-300">
          Ir al Foro del Curso
        </button>
      </div>
    </div>
  );
};

export default CourseNavBar;
