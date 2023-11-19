import RegistrationForm from '@/components/RegistrationForm'
import Link from 'next/link'
import React from 'react'

export default function Registration() {
  return (
    <div>
      <div>
      <h1 className="font-semibold text-center">Create Account</h1>
        <p className="text-gray-500 text-sm text-center">
          Welcome to Business Analyst.
        </p>
      </div>
      <RegistrationForm/>
      <p className='pt-3'>Already have an account ? please  <Link href='/login' className='text-primary'>Login</Link></p>
    </div>
  )
}
