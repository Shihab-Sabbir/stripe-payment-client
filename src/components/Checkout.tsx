'use client'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}` )

const Checkout = () => {
  const searchParams = useSearchParams()
  const clientSecret = searchParams.get('clientSecret') as string;

  return (
    <Elements stripe={stripePromise}>
    <CheckoutForm clientSecret={clientSecret}/>
  </Elements>
  )
}

export default Checkout;
