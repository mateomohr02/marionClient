"use client";

import { useEffect, useState } from "react";
import { useGetUserCourses } from "../../../../hooks/useGetUserCourses";
import Link from "next/link";
import UserCourseCard from "./UserCourseCard";

const UserInfo = ({ userData }) => {
  const [userCourses, setUserCourses] = useState([]);

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
              description={course.description}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default UserInfo;
