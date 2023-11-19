'use client'

import React, { useState } from 'react';
import Notification from './Notification';
import useAPI from '@/utils/axios';
import { useRouter } from 'next/navigation';
import CustomForm from './CustomForm';
import { setTimeout } from 'timers';

export default function RegistrationForm() {
  const { registerUser } = useAPI();
  const router = useRouter();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fields = [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Password', required: false },
  ];

  const handleFormSubmit = async (data: Record<string, string>) => {
    setNotification(null)
    try {
      const user = await registerUser(data as { name: string; email: string; password: string });
      if (user?.statusCode === 200) {
        setNotification({
          message: 'Registration successful !',
          type: 'success',
        });
        setTimeout(() => {
          router.push('/login')
        }, 1000);
        
      } else {
        setNotification({
          message: user || 'Something went wrong, please try again!',
          type: 'error',
        });
      }
    } catch (error:any) {
      setNotification({
        message: error || 'Something went wrong, please try again!',
        type: 'error',
      });
    }
  };

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} setMessage={setNotification} />
      )}
      <CustomForm fields={fields} onSubmit={handleFormSubmit} />
    </>
  );
}
