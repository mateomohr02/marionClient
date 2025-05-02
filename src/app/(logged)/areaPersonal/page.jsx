'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/app/components/AdminPanel';

const Page = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      router.push('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthChecked(true);
    }
  }, []);

  if (!isAuthChecked) return null;

  return (
    <div>
      {user?.userType === '0' ? <AdminPanel /> : null}
    </div>
  );
};

export default Page;
