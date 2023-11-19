import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import React from 'react'

export default function Login() {
  return (
    <div>
    <div>
    <h1 className="font-semibold text-center">Create Account</h1>
      <p className="text-gray-500 text-sm text-center">
        Welcome to Business Analyst.
      </p>
    </div>
    <LoginForm/>
    <p className='pt-3'>Do not have an account ? please  <Link href='/registration' className='text-primary'>Registar</Link></p>
  </div>
  )
}
