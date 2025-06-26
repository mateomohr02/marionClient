"use client";

import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetUserCourses } from "@/hooks/useGetUserCourses";
import { useLogout } from "@/hooks/useLogout";
import { showAlert } from "@/redux/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import UserCourseCard from "./UserCourseCard";
import { useLocale, useTranslations } from "next-intl";
import Loading from "../Loading";
import UserNoCourses from "./UserNoCourses";

const UserInfo = ({ userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations("Profile");
  const [userCourses, setUserCourses] = useState([]);
  const [loadingCourses, setLoading] = useState(true);

  const locale = useLocale();
  const { logout, loading, error } = useLogout({
    messages: {
      success: t("UserNoCourses.SuccessLogout"),
      error: t("UserNoCourses.ErrorLogout"),
    },
  });

  useEffect(() => {
    const fetchUserCourses = async () => {
      const courses = await useGetUserCourses();
      if (courses) {
        setUserCourses(courses);
      }
      setLoading(false);
    };

    fetchUserCourses();
  }, []);

  const handleLogout = () => {
    const result = logout();
    if (result && result.status === "success") {
      dispatch(showAlert(result.message));
      router.push("/");
    } else {
      dispatch(showAlert(result.message || t("UserInfo.ErrorLogout")));
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {loadingCourses || loading ? (
        <Loading />
      ) : userCourses.length === 0 ? (
        <UserNoCourses />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="font-dancing text-6xl text-gradient px-20 pt-2 mt-2 mb-4">
              <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
                {t("UserInfo.Title")}
              </span>
            </h2>
            <div className="px-20 pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-left hover:text-red-600 transition hover:rounded-full hover:bg-red-200 p-2 rounded-full border border-black/20 hover:border-red-400"
              >
                <LogOut className="w-5 h-5" />
                {t("UserInfo.LogOut")}
              </button>
            </div>
          </div>

          {userCourses.map((course) => (
            <UserCourseCard
              key={course.id}
              title={course.name?.[locale] || "Sin título"}
              courseId={course.id}
              description={course.description?.[locale] || ""}
              poster={course.poster?.[locale] || ""}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default UserInfo;
