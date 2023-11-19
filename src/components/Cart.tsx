"use client";

import React from "react";
import Image from "next/image";
import useStore from "@/store/cartStore";
import useAPI from "@/utils/axios";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/store/loadingStore";

const Cart = () => {
  const {
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    cart,
  } = useStore();
  const {user} = useAuthStore();
  const {isLoading} = useLoadingStore();
  const router = useRouter();
  const {createPaymentIntent} = useAPI();
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1;
    const shipping = subtotal * 0.1;
    return Number((subtotal + tax + shipping).toFixed(2));
  };

  const handleCheckout = async () => {
    const amount = calculateTotal();
    const accessToken = user?.accessToken?.token;
    const payment = await createPaymentIntent(amount,accessToken as string)
    if(payment.statusCode === 200){
      router.push(`/checkout?clientSecret=${payment.data.clientSecret}`)
    }
  };

  return (
    <div className="w-full sm:w-[280px] shadow-lg p-4 h-full bg-white sm:mt-0 mt-8 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
        {cart?.length === 0 && <p>Cart is empty !</p>}
        <div className="min-h-[300px]">
          {cart.map((product) => (
            <div
              key={product.id}
              className="mb-4 flex gap-2 items-center shadow p-2 rounded-md"
            >
              <div className="flex flex-col items-center">
                <button
                  onClick={() => incrementQuantity(product.id)}
                  className="bg-blue-500 text-white  grid place-content-center p-1 h-[25px] w-[25px] rounded-full"
                >
                  +
                </button>
                <span>{product.quantity || 0}</span>
                <button
                  onClick={() => decrementQuantity(product.id)}
                  className="bg-gray-300 grid place-content-center p-1 h-[25px] w-[25px] rounded-full"
                >
                  -
                </button>
              </div>
              <div className="flex gap-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={70}
                  className="border-2 rounded-md"
                />
                <div>
                  <p className="text-xs">{product.name}</p>
                  <p className="text-xs">${product.price}</p>
                </div>
              </div>
              <p className="text-xs font-semibold">
                {product.subPrice?.toFixed(2)}
              </p>
              <button
                className="text-error"
                onClick={() => removeFromCart(product.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Tax (10%):</span>
            <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Shipping (10%):</span>
            <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-4">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>

        <div className={(cart?.length === 0 && " hidden ") + ' flex justify-between mt-4 '}>
          <button
            onClick={clearCart}
            className="bg-warning text-white px-4 py-2 rounded-md"
          >
            Clear All
          </button>
          <button
            onClick={handleCheckout}
            disabled={cart?.length === 0}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            {isLoading ? "Proccessing...":"Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
