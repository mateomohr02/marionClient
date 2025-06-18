
import { setCourseDetail, setCurrentCourse } from "@/redux/slices/courseSlice";
import { useDispatch } from "react-redux";

export const useSetCourseDetail = () => {
  const dispatch = useDispatch();

  const setDetail = (course) => {
    dispatch(setCourseDetail(course));
    dispatch(setCurrentCourse(course.id));
  };

  return setDetail;
};
