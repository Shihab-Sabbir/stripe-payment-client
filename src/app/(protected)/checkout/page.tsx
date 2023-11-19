import dynamic from 'next/dynamic'
import React from 'react'

const Checkout = dynamic(() => import('@/components/Checkout'), { ssr: false })

export default function page() {
  return (
    <Checkout/>
  )
}
