import { useSelector, useDispatch } from "react-redux";
import {
  setLessonDetail,
  setCurrentLesson,
} from "@/redux/slices/courseSlice";

import { ChevronLeft, ChevronRight } from "lucide-react";

const LessonFooterNavigation = () => {
  const dispatch = useDispatch();

  const lessons = useSelector((state) => state.course.courseLessons);
  const currentLessonId = useSelector((state) => state.course.currentLesson);

  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === currentLessonId
  );

  const handleNextLesson = () => {
    const nextLesson = lessons[currentIndex + 1];
    if (nextLesson) {
      dispatch(setCurrentLesson(nextLesson.id));
      dispatch(setLessonDetail(nextLesson));
    }
  };

  const handlePrevLesson = () => {
    const prevLesson = lessons[currentIndex - 1];
    if (prevLesson) {
      dispatch(setCurrentLesson(prevLesson.id));
      dispatch(setLessonDetail(prevLesson));
    }
  };

  return (
    <div className="flex justify-between items-center px-8 mt-12">
      {/* Botón Anterior (solo si no estamos en la primera lección) */}
      {currentIndex > 0 ? (
        <div className="p-[2px] rounded-full bg-gradient-to-r from-gradientLeft to-gradientRight">
          <button
            onClick={handlePrevLesson}
            className="text-xl text-black font-semibold px-4 py-2 rounded-full bg-snow/70 hover:bg-snow transition-all ease-in-out duration-300 flex items-center gap-2"
          >
            <ChevronLeft />
            Clase Anterior
          </button>
        </div>
      ) : <div />}

      {/* Botón Siguiente (solo si no estamos en la última lección) */}
      {currentIndex < lessons.length - 1 ? (
        <div className="p-[2px] rounded-full bg-gradient-to-r from-gradientLeft to-gradientRight">
          <button
            onClick={handleNextLesson}
            className="text-xl text-black font-semibold px-4 py-2 rounded-full bg-snow/70 hover:bg-snow transition-all ease-in-out duration-300 flex items-center gap-2"
          >
            Clase Siguiente 
            <ChevronRight />
          </button>
        </div>
      ) : <div />}
    </div>
  );
};

export default LessonFooterNavigation;

