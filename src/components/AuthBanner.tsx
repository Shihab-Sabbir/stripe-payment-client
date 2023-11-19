import React from 'react'

export default function AuthBanner() {
  return (
    <div className="bg-[#503AF0] font-bold h-screen lg:w-full hidden lg:grid place-content-center">
        <div className="text-center max-w-lg text-white mb-7 2xl:mb-10">
        <h1 className='font-semibold'>Welcome to Trade Analysis Business Solution</h1>
        <p>
          Elevate financial management system with our all-inclusive statistical Solutions. You can justify business performance, benefits and thus enhanced efficiency.
        </p>
      </div>
      <div className="w-full flex justify-center max-w-[70%] items-center relative">
        {/* <img src={onBoardImg} alt="onBoardImg" className='z-30' /> */}
        <span className='w-[55%] z-10 h-36 absolute bottom-1 shadow-2xl'></span>
      </div>
    </div>
  )
}
