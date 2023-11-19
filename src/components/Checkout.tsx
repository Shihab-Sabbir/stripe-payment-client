'use client'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51M6ASuFYDMLeNVaQCwHq9jco0SCMUiANa4YcODdYzhmHIk40aV4sBkcGCwdsfHbeXza2Nk1CF0e7wrb8osPkV8xy00fXPfdPhn");


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
