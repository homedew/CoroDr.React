import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
    setCartCount(storedCartCount);
  }, []);

  const updateCartCount = (count) => {
    setCartCount(count);
    localStorage.setItem('cartCount', JSON.stringify(count));
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
