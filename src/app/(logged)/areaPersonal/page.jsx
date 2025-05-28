'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/app/components/AdminPanel';
import UserInfo from '@/app/components/profile/UserInfo';
import Loading from '@/app/components/Loading';

const Page = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push('/login');
    } finally {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {user?.userType === '0' ? (
        <AdminPanel />
      ) : (
        <UserInfo userData={user} />
      )}
    </div>
  );
};

export default Page;
