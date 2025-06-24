"use client";

import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetUserCourses } from "@/hooks/useGetUserCourses";
import { useLogout } from "@/hooks/useLogout";
import UserCourseCard from "./UserCourseCard";
import { useRouter } from "next/navigation";
import UserNoCourses from "./UserNoCourses";
import { useLocale, useTranslations } from "next-intl";
import Loading from "../Loading";

const UserInfo = ({ userData }) => {
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Profile");
  const logout = useLogout(); // ✅ Llamado del hook directamente

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

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {loading ? (
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
                onClick={() => {
                  logout(); // ✅ ya no se llama el hook dentro de esta función
                  router.push("/");
                }}
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
