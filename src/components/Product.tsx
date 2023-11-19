import useStore from '@/store/cartStore';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ProductProps {
  image: StaticImageData;
  name: string;
  price: number;
  id: number;
}

const Product: React.FC<ProductProps> = ({ id, image, name, price }) => {
  const { addToCart, removeFromCart, cart } = useStore();

  const isInCart = cart.find((item) => item.id === id);

  return (
    <div className="text-center w-full sm:w-[220px] shadow-md h-[300px]">
      <Image src={image} alt={name} className="mb-2 w-full sm:w-[220px] h-[180px]" />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      {isInCart ? (
        <button
          onClick={() => removeFromCart(id)}
          className="bg-warning text-white px-4 py-2 rounded-md mt-2 hover:bg-red-700 transition duration-300"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => addToCart(id, { id, image, name, price })}
          className="bg-primary text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
