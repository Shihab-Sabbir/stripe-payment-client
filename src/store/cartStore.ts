// Create a store using Zustand
import { StaticImageData } from "next/image";
import create from "zustand";
import product1 from '@/assets/product1.png';
import product2 from '@/assets/product2.png';

interface Product {
  id: number;
  name: string;
  price: number;
  image: StaticImageData;
}

interface CartItem extends Product {
  quantity: number;
  subPrice: number;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (productId: number, product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

const useStore = create<StoreState>((set) => ({
  products: [
    {
      image: product1,
      name: "Adidas Shoe",
      price: 49.99,
      id: 1,
    },
    {
      image: product2,
      name: "Adidas Bottle",
      price: 19.99,
      id: 2,
    },
  ],
  cart: [],
  addToCart: (productId, product) =>
    set((state) => {
      const productToAdd = state.products.find((p) => p.id === productId);
      if (productToAdd) {
        const existingCartItem = state.cart.find(
          (item) => item.id === productId
        );

        if (existingCartItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === productId
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subPrice: (item.quantity + 1) * item.price,
                  }
                : item
            ),
          };
        } else {
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: 1,
                subPrice: product?.price || 0,
              },
            ],
          };
        }
      }

      return state;
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  incrementQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subPrice: (item.quantity + 1) * item.price,
            }
          : item
      ),
    })),
  decrementQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              subPrice: (item.quantity - 1) * item.price,
            }
          : item
      ),
    })),
}));

export default useStore;
