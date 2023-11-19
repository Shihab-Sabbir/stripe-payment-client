/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Cart from '@/components/Cart'
import React,{useEffect} from 'react'
import product1 from '@/assets/product1.png';
import product2 from '@/assets/product2.png';
import Product from '@/components/Product';
import useStore from '@/store/cartStore';

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

  useEffect(() => {
    useStore.setState({ products: [productData1, productData2] });
  }, []);

  return (
    <div className='flex sm:flex-row flex-col h-full'>
       <div className='flex-1 flex flex-col md:flex-row gap-4'>
        <Product {...productData1} />
        <Product {...productData2} />
       </div>
       <Cart/>
    </div>
  )
}
