'use client'

import AccessForm from '@/app/components/AccessForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      router.push('/login'); // Redirige si no hay sesión
    } else {
      setIsAuthChecked(true); // Permitir renderizar si está todo bien
    }
  }, []);

  if (!isAuthChecked) return null; // Evita el parpadeo o render innecesario

  return (
    <div>
        Area Personal
    </div>
  );
}

export default Page;
