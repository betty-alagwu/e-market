import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "@/Context/StateContext";
import { Cart } from './'


const Navbar = () => {
  const {showCart, setShowCart} = useStateContext()
  const { cartItems } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">E-Market Store</Link>
      </p>
      <button type="button" className="cart-icon" onClick={ () => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{cartItems.length}</span>
      </button>
      {showCart && <Cart/>}
    </div>
  );
};

export default Navbar;
