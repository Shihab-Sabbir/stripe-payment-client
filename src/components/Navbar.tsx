"use client"

import useAuthStore from '@/store/authStore';
import React from 'react'
import userImage from '@/assets/user.png'
import Image from 'next/image';

export default function Navbar() {
  const {logout} = useAuthStore();
  const {user} = useAuthStore();
  return (
    <div className='w-full  h-[50px] bg-primary/70 flex items-center justify-between px-3'>
      <button onClick={()=>logout()} className='px-3 py-1 bg-white hover:bg-primary hover:text-white rounded-lg text-xs uppercase font-semibold'>
        Logout
      </button>
      <div className='flex items-center gap-4'>
       <Image src={userImage} alt='user' width={40} className='rounded-full'/>
       <div className='text-xs text-white font-semibold'>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
       </div>
      </div>
    </div>
  )
}
