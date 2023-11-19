'use client'

import Cart from '@/components/Cart'
import React from 'react'
import product1 from '@/assets/product1.png';
import product2 from '@/assets/product2.png';
import Product from '@/components/Product';

export default function Shopping() {
  const productData1 = {
    image: product1,
    name: 'Adidas Shoe',
    price: 49.99,
    id:1
  };
  const productData2 = {
    image: product2,
    name: 'Adidas Bottle',
    price: 19.99,
    id:2
  };

  return (
    <div className='flex sm:flex-row flex-col h-full'>
       <div className='flex-1 flex gap-4 flex-wrap'>
        <Product {...productData1} />
        <Product {...productData2} />
       </div>
       <Cart/>
    </div>
  )
}
