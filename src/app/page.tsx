import React from 'react'
import Login from './(auth)/login/page'
import AuthBanner from '@/components/AuthBanner'

export default function Home() {

  return (
   <div className="h-screen w-screen flex items-center">
      <AuthBanner />
      <div className="h-screen w-full grid place-content-center">
        <Login/>
      </div>
    </div>
  )
}
