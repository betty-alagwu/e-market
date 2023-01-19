import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-hot-toast";

interface StateContextValue {
  showCart: boolean;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  addItemToCart: (cartItem: CartItem) => void;
}

export const AppStoreContext = createContext<StateContextValue>({
  showCart: false,
  setShowCart() {},
  cartItems: [],
  setCartItems () {},
  addItemToCart() {},
});

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export const StateContext = ({ children }: PropsWithChildren) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addItemToCart(item: CartItem) {
    setCartItems([...cartItems, item]);
    toast.success(`${item.quantity} ${item.name} added to cart`);
    
  }




  return (
    <AppStoreContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        addItemToCart,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
};

export const useStateContext = () => useContext(AppStoreContext);
