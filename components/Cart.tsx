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
import { useStateContext } from "@/Context/StateContext";
import getStripe from "@/graphql/getStripe";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartItems, setShowCart, setCartItems } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/checkoutSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    });
    console.log(response);
    if (response.status === 500) {
      return;
    }
    const data = await response.json();
    toast.loading("Redirecting to checkout...");

    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  const cartTotal = cartItems.reduce(function (total, cartItem) {
    return total + cartItem.quantity * cartItem.price;
  }, 0);

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
                  <span className="flex top">
                    ({item.totalAvailable} Items available)
                  </span>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <button
                          className="minus"
                          onClick={function () {
                            setCartItems((prev) => {
                              const newCartItems = [...prev];
                              const index = newCartItems.findIndex(
                                (cartItem) => cartItem.name === item.name
                              );
                              if (index >= 0) {
                                if (newCartItems[index].quantity === 1) {
                                  newCartItems.splice(index, 1);
                                } else {
                                  newCartItems[index].quantity -= 1;
                                }
                              }
                              return newCartItems;
                            });
                          }}
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="num">{item.quantity}</span>
                        <button
                          className="plus"
                          disabled={item.quantity === item.totalAvailable}
                          onClick={function () {
                            setCartItems((prev) => {
                              const newCartItems = [...prev];
                              const index = newCartItems.findIndex(
                                (cartItem) => cartItem.name === item.name
                              );
                              if (index >= 0) {
                                newCartItems[index].quantity += 1;
                              }
                              return newCartItems;
                            });
                          }}
                        >
                          <AiOutlinePlus />
                        </button>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={function () {
                        setCartItems((prev) => {
                          const newCartItems = [...prev];
                          const index = newCartItems.findIndex(
                            (cartItem) => cartItem.name === item.name
                          );
                          if (index >= 0) {
                            newCartItems.splice(index, 1);
                          }
                          return newCartItems;
                        });
                      }}
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
              <button className="btn" type="button" onClick={handleCheckout}>
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
