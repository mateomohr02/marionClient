import { useSelector, useDispatch } from "react-redux";
import {
  setLessonDetail,
  setCurrentLesson,
} from "@/redux/slices/courseSlice";
import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from '@/i18n/navigation';
import { usePathname } from "next/navigation";
import { useTranslations } from "use-intl";

const CourseNavBar = ({locale}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const lessons = useSelector((state) => state.course.courseLessons);
  const currentLesson = useSelector((state) => state.course.currentLesson);
  const currentLessonDetail = useSelector((state) => state.course.lessonDetail);
  const courseTitle = useSelector((state) => state.course.courseDetail.name);

  const t = useTranslations("Lessons");

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
    }, 300); 
  };

  return (
    <div className="w-full py-3 px-8 flex justify-between items-center text-sm font-medium z-10 relative">
      <div className="flex items-center gap-2">
        <button
          onClick={handleBackToFirstLesson}
          className="text-gray-800 font-semibold text-xl hover:underline"
        >
          {locale === "de" ? courseTitle.de : courseTitle.es}
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
            {t("NavBar.Text1")} {lessons.findIndex((l) => l.id === currentLesson) + 1}:{" "}
            {locale === "de" ? currentLessonDetail.title.de : currentLessonDetail.title.es}
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
                  {t("NavBar.Text1")} {index + 1}: {locale === "de" ? lesson.title.de : lesson.title.es}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Link
        href={`${pathname.replace(/^\/(es|de)/, '')}/forum`}
        className="relative inline-flex items-center justify-center p-[2px] font-medium font-poppins text-black transition duration-300 ease-in-out rounded-full overflow-hidden group"
      >
        {/* Fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-400 rounded-full blur-md opacity-70 group-hover:blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />

        {/* Contenido del botón */}
        <span className="relative z-10 px-6 py-2 text-base sm:text-lg bg-white/80 hover:bg-white rounded-full backdrop-blur-sm transition-colors duration-300">
          🗪 {t("NavBar.Forum")}
        </span>
      </Link>
    </div>
  );
};

export default CourseNavBar;
