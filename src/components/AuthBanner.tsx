import React from 'react'
import authBanner from '@/assets/authBanner.png'
import Image from 'next/image'

export default function AuthBanner() {
  return (
    <div className="bg-[#503AF0] font-bold h-screen lg:w-full hidden lg:grid place-content-center">
        <div className='max-w-lg'>
        <div className="text-center  text-white mb-7 2xl:mb-10">
        <h1 className='font-semibold'>Welcome to Stripe Payment</h1>
        <p>
        Stripe elevates financial systems with a global, user-friendly interface. Security, customization, subscription management, developer tools, real-time reporting, quick payouts, mobile optimization, and fraud prevention enhance efficiency, benefiting business performance.
        </p>
      </div>
      <div className="w-full flex justify-center  items-center relative">
        <Image src={authBanner} alt="authBanner" className='z-30' />
        <span className='w-[55%] z-10 h-36 absolute bottom-1 shadow-2xl'></span>
      </div>
        </div>
    </div>
  )
}
