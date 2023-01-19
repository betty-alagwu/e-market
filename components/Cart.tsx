import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { CartItem, useStateContext } from "@/Context/StateContext";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartItems, setShowCart, setCartItems } = useStateContext();

  const cartTotal = cartItems.reduce(function (total, cartItem) {
    return total + cartItem.quantity * cartItem.price;
  }, 0);

  const updateCart = (item: CartItem, quantity: number) => {
    const foundItem = cartItems.find((cartItem) => cartItem.name === item.name);

    if(foundItem){
      setCartItems([...cartItems, { ...foundItem, quantity: quantity + 1 }])
    }
    setCartItems([...cartItems, { ...item, quantity: quantity - 1 }]);
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({cartItems.length} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shoppping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item.name}>
                <img
                  src={item?.image}
                  alt={item.name}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price * item.quantity} </h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <button
                          className="minus"
                          //   disabled={qty === 1}
                          //   onClick={function () {
                          //     setQty(qty - 1);
                          //   }}
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="num">0</span>
                        <button className="plus" onClick={() => updateCart()}>
                          <AiOutlinePlus />
                        </button>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => setShowCart(false)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${cartTotal}</h3>
            </div>
            <div className="btn-container">
              <button className="btn" type="button">
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
