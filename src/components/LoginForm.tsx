'use client'

import React, { useEffect } from 'react';
import CustomForm from './CustomForm';
import useAPI from '@/utils/axios';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast/headless';
import Notification from './Notification';

export default function LoginForm() {
  const { loginUser } = useAPI();
  const { login, user } = useAuthStore();
  const router = useRouter();
  const [notification, setNotification] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/shopping');
    }
  }, [router, user]);

  const fields = [
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Password', required: false },
  ];

  const handleFormSubmit = async (data: Record<string, string>) => {
    try {
      const loginData = await loginUser(data as { email: string; password: string });

      if (loginData?.statusCode === 200 && loginData?.data) {
        const authInfo = loginData.data;
        toast.success('Logged in successfully !');
        login(authInfo);
        const isBrowser = typeof window !== "undefined"; 
        isBrowser && localStorage.setItem('stripe-user', JSON.stringify(authInfo));
        setNotification({
          message: 'Loggedin successfully!',
          type: 'success',
        });
      } else {
        setNotification({
          message: loginData || 'Something went wrong, please try again!',
          type: 'error',
        });
      }
    } catch (error : any) {
      setNotification({
        message: error || 'An unexpected error occurred, please try again!',
        type: 'error',
      });
    }
  };

  return (
    <>
      {notification && <Notification message={notification.message} type={notification.type} setMessage={setNotification}/>}
      <CustomForm fields={fields} onSubmit={handleFormSubmit} />
    </>
  );
}
