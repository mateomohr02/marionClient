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

  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXx8/XCy9K/yND09vfw8vTP1tzp7O/i5ure4+fO1dvJ0dfT2d/EzNPt7/Lb4OXo6+4FeM7UAAAFL0lEQVR4nO2c24KrIAxFLdha7///t0dxOlWDSiAKztnrbR4G6SoJBKHZA6zJYncgQeCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ocEKBEwqcUOCEAicUOKHACQVOKHBCgRMKnFDghAInFDihwAkFTihwQoETCpxQ4IQCJxQ4ocAJBU4ot3Oi1KMq64FnWTVq+EueWzlRquqKVn/J+/ezEfdyHydKPYtc62yF1m1Xymq5ixPVdDnx8eslf1eCVu7hRFXFppAfLW39kNJyByeqOTJirGTvRsbKDZyozsHIpKUQsZK8E1Vu55GTrKTuRL0ZRoyVLviZaTtRVctUMuaVOnCoJO1E1WwjxsorbGZO2Qk7br5WuhApKTvpfZWMy5WAoZKuk6b1NhI4VJJ10uRBSsas0ng+OlUnVaARw9NvqCTqRERJpt9eUtJ0IqPEN36SdNIIKRnIPeafFJ0Ep9c5mr+qTdFJ2CRMpLAn5fScqJeokrFWZkoRdaImwtpw2T9iSnnxuiDoRFXda6hK28JzWTA14ryBxKFlTT9iTlT1W57o3Lta96yED8krRieknCw/DDuEP1TnKBlgzMlCTtZDXr+8pIjOwitK5x7JOKFD3mukiE85ix45S5FxYll46prdiv8ekpsU19wv4kS9LV1ouQPlrPzKliIzTuw9YDYiVfgFSxFx8rR+wcyMomSX9HYpTjlFwonqrB3gBc/JyYQjRcRJYe8Ay4l9rMlLcVi8iTjp7Y/nOBHcMjngWEoi4+TUlcmKw9rnxHzCWMqeU/ltkB9JEZl3SusnYmwQn1fm2GgPeiOzZrM9WZfu/3/BNDznYATLOLENffep+JppeMZBMSZUF9N6ljFM7KF3qpTduBZyQj4W53XTiRsEm1L2dr2k9k9W9Rtjq2BrJj9Zyk7pI7bP9lw8kfH+4KIFLGF77Sa3R90Un0POvHNCcYzsLVMk9+2buni1bd9xjMSJHMPmjCz7zov/fidW5GQ7OS/2e8BoRrLtrBfXScTIMVLsk09cJxEjZ8I6+cR1EmG1tsRaDsZ0EjlyDL0leuxOpulD4JTALtfXORRbnqVO1LDOePdtpoclWPsqulL+wt0P0SNnxFKrrp2opmuXl+5OuHA3PSmByDGQ9ezSydYdM+ELd4YUIsdANnoWTva2RSUv3JlnJRE5I2RbY+6kee1+dTrrhC7cPTZeMUdivZnydaIc3tdqqWuI6USOYZlSfp0oxzVlJxNByUSOYZlSPk6cDzqEXy17JDTn/LBMKRlTSRZ4X2giep2zZnEwZHLiGjifFt6BTtKKHMMspUxO2BkvDzoDm1jkGGa7bsaJx0t9XfgrOfuMlhezwsc48RrKufvhyiXXHatg8T2Zkm0eHzluxO8W4pXHKljkXycBt3h9blFdeqyCx2fPOguLbn6qTWsBu+Czxs/CopsdP4kmkx+mcZ8FRrfuWUqSTSYT005keDucW4iXnzRhMg17iYacC6A0VyZzzIQs0pBrUrn22JoXY4Us0pDjaZMzb+dIMX6/Qi0dHSU0XHySz48heqSaOs60vsvlq2mtpzj9OCh/Trgjew7afgLar63d6ec2SmTZm37+UyV7048K+Gmkm7O10A/8aaSbY7sEr8rYvYoNnX4Sr3EuYJVpVc35Ccu/innZbryMJ1n4v9f4N9FZ39XPZ931GYzMGH9VPHYf";


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
              poster={course.poster?.[locale] || placeholder}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default UserInfo;
