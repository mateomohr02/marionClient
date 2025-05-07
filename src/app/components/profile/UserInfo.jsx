"use client";

import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetUserCourses } from "../../../../hooks/useGetUserCourses";
import { useLogout } from '../../../../hooks/useLogout';
import Link from "next/link";
import UserCourseCard from "./UserCourseCard";
import { useRouter } from "next/navigation";


const UserInfo = ({ userData }) => {
  const [userCourses, setUserCourses] = useState([]);
  const router = useRouter()


  const logout = () => {
    useLogout();
    router.push("/");
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      const courses = await useGetUserCourses();
      if (courses) {
        setUserCourses(courses);
      }
    };

    fetchUserCourses();
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {userCourses.length === 0 ? (
        <p className="px-5 pt-2 min-h-[calc(100vh-8rem)]">
          No formas parte de ningún curso. Ve a{" "}
          <Link href={"/cursos"} className="underline text-blue-600">
            Cursos
          </Link>{" "}
          para ver los cursos disponibles.
        </p>
      ) : (
        <>
          <h2 className="font-dancing text-6xl text-gradient px-20 pt-2 mt-2 mb-4">
            <span className="bg-gradient-to-r from-gradientLeft to-gradientRight bg-clip-text text-transparent">
              Mis Cursos
            </span>
          </h2>
          {userCourses.map((course) => (
            <UserCourseCard
              key={course.id}
              title={course.name}
              courseId={course.id}
              description={course.description}
            />
          ))}
          <div className="px-20 pt-2">
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 text-left hover:text-red-600 transition hover:rounded-full hover:bg-red-200 p-2 rounded-full border border-black/20 hover:border-red-400 "
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
