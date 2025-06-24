"use client";
import { useRouter } from "next/navigation";
export const useLogout = () => {
    const router = useRouter();
    const logout = () => {
    localStorage.clear(); // Limpia token y datos persistentes
    router.push("/"); // Redirige al home (opcional)
  };

   return logout;
}