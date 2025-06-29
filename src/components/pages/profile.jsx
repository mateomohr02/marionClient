'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import UserInfo from '@/components/profile/UserInfo';
import Loading from '@/components/Loading';

const Profile = () => {
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

export default Profile;
