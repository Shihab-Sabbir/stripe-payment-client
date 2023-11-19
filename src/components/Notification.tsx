import React, { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  setMessage:Function
}

const Notification: React.FC<NotificationProps> = ({ message, type, setMessage }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setMessage(null)
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [setMessage]);

  return (
    <div
      className={`p-4 mb-4 absolute top-2 right-2 ${
        type === 'success' ? 'bg-green-200' : 'bg-red-200'
      } rounded-md ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity ease-in-out duration-500`}
    >
      {message}
    </div>
  );
};

export default Notification;
