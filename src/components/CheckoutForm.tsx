'use client'

import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from "react";
import '@/style/stripe.style.css'
import { FaCreditCard } from "react-icons/fa";
import { FcExpired } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import Notification from './Notification';

export const CheckoutForm = ({clientSecret}:{clientSecret:string}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [postal, setPostal] = useState('');
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setProcessing(true)
    if (!stripe || !elements) {
      return;
    }
    
    const card = elements.getElement(CardNumberElement);

        if (card == null) {
            return;
        }


    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card,
            billing_details: {
                name: 'aaaa',
                email: 'aaa@gmail.com',
                address: {
                    postal_code: '424242',
                },
            },
        },
    });

    if (error && 'message' in error) {
        setErrorMessage(error.message as string);
        //toast.error(<ErrorResult>{errorMessage}</ErrorResult>);
        setProcessing(false)
        return;
    }
    else {
        setErrorMessage(null);
        if (!!elements && elements !== null) {
            if (paymentIntent!.status === "succeeded")  {
                const id:string = paymentIntent!.id;
                const price = ((paymentIntent!.amount)/100).toFixed(2);
                router.push(`/greetings?id=${id}&price=${price}`);
                setProcessing(false);
            }
          }
    }
  };

  const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '14px',
            color: '#424770',
            letterSpacing: '0.025em',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

  return (
    <form onSubmit={handleSubmit} className='payment-form border p-3 max-w-[320px] sm:max-w-[400px] shadow-lg bg-transparent' >
        <p className='pb-5'>Stripe Payment Gateway</p>
    <div className='relative'>
        <label className='text-gray-600 text-xs font-bold uppercase' htmlFor="cardNumber">Card Number</label>
        <CardNumberElement
            id="cardNumber"
         
            options={ELEMENT_OPTIONS}
        />
        <div className='absolute top-[45px] right-3 text-xl'><FaCreditCard /></div>
    </div>
   <div className='relative'>
   <label className='text-gray-600 text-xs font-bold uppercase' htmlFor="expiry">Card Expiration</label>
    <CardExpiryElement
        id="expiry"
  
        options={ELEMENT_OPTIONS}
    />
    <div className='absolute top-[45px] right-3 text-xl'><FcExpired /></div>
   </div>
    <div className='relative'>
        <label className='text-gray-600 text-xs font-bold uppercase' htmlFor="cvc">CVC</label>
        <CardCvcElement
            id="cvc"
          
            options={ELEMENT_OPTIONS}
        />
        <div className='absolute top-[45px] right-3 text-xl'><RiLockPasswordLine /></div>
    </div>
    <label className='hidden text-black dark:text-white ' htmlFor="postal" >Postal Code</label>
    <input
        id="postal"
        required
        placeholder="12345"
        value='12345'
        onChange={(e) => {
            setPostal(e.target.value);
        }}
        className='hidden'
    />

    <button type="submit"
    disabled={!stripe || !clientSecret || processing}
    className='text-xs uppercase px-3 py-2 rounded-md font-semibold text-white bg-primary dark:border border-0'>
        {processing ? "Processing...": "Pay Now"}
    </button>
    {errorMessage && <Notification message={errorMessage} setMessage={setErrorMessage} type={'error'} />}
</form>
  );
};


