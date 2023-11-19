'use client'

import useAuthStore from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';

const GreetingsPage = () => {
  const search = useSearchParams();
  const {user} = useAuthStore();
const paymentIntentId = search.get('id');
const price = search.get('price');
const router = useRouter();

  return (
    <div className='text-center'>
      <h1 className='text-xl text-success font-semibold'>Congratulations {user?.name}</h1>
      <p>You have successfully paid , {price} USD</p>
      <p>Payment ID is <span className='font-semibold'>{paymentIntentId}</span></p>
      <button onClick={()=>router.push('/shopping')} 
      className='mt-10 w-[200px] py-3 px-4 bg-primary rounded-lg text-white font-bold'>
        Home
      </button>
    </div>
  );
};

export default GreetingsPage;
