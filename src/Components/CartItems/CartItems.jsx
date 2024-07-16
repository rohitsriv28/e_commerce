import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import removeIcon from "../Assests/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItem, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartItems-format cartItems-format-main">
                <img src={e.image} alt="" className="cartItems-product-image" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartItems-quantity">{cartItem[e.id]}</button>
                <p>${e.new_price * cartItem[e.id]}</p>
                <img
                  src={removeIcon}
                  alt=""
                  onClick={() => removeFromCart(e.id)}
                  className="cartIcon-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartItems-totalItems">
              <p>Subtotal</p>
              <p>
                {"\u20B9"}
                {getTotalCartAmount()}
              </p>
            </div>
            <hr />
            <div className="cartItems-totalItems">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItems-totalItems">
              <h3>Total</h3>
              <h3>
                {"\u20B9"}
                {getTotalCartAmount()}
              </h3>
            </div>
          </div>
          <button>CheckOut</button>
        </div>
        <div className="cartItems-promocode">
          <p>If you have a promo code, enter it here..</p>
          <div className="cartItems-promoBox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
