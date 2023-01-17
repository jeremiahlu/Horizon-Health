import styles from "./Checkout.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import {
  fetchCart,
  addCartItem,
  removeCartItem,
  cartClear,
} from "../../store/cart";

const Checkout = ({ cart }) => {
  const dispatch = useDispatch();
  const myCart = useSelector((state) => Object.values(state.cart));
  const items = useSelector((state) => state.items);
  let cartPrice = cart?.reduce((a, b) => a + b.quantity * b.item.price, 0);
  // console.log(cart, "CARTPRICE");
  let tax = parseInt(cartPrice * 0.06).toFixed(2);
  let shipping = parseInt(cartPrice * 0.03).toFixed(2);
  let totalPrice = parseInt(cartPrice + +tax + +shipping).toFixed(2);

  let quantity = cart?.map((item) => item.quantity);
  // console.log(quantity, "HASDA");
  let totalQuantity = quantity.reduce((a, b) => a + b, 0);

  // const cartQuantity = (item, price) => {
  //   const names = cart.map((item) => item.item.name);
  //   const prices = cart.map((item) => item.item.price);
  //   const cartItem = names.find((product) => product.name == item.item.name);

  //   price = quantity.map((value, index) => value * prices[index]);
  // };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutHeader}>
        <img
          src="https://i.pinimg.com/564x/8d/29/ef/8d29ef579d2a0b86886f53673a5324da.jpg"
          default=""
          className={styles.checkoutLogo}
        />
        <span className={styles.name}> Horizon Health </span>
      </div>

      <div className={styles.orderSummaryDiv}>
        <div className={styles.orderSummary}> Order Summary</div>
        {myCart?.map((item, index) => {
          // console.log(item.id);
          return (
            <>
              <div key={item?.id} className={styles.card}>
                <img className={styles.image} src={item?.item.image} />

                <div className={styles.itemDetails}></div>
                <div className={styles.nameQuant}>
                  <div className={styles.name}>
                    {`${item?.quantity} x ${item?.item.name}`}
                  </div>

                  <div className={styles.price}>
                    ${item?.item.price * item?.quantity}
                  </div>
                </div>
              </div>
              {/* <div className={styles.pricing}>
                <div className={styles.subtotal}>Subtotal: ${cartPrice}</div>
                <div className={styles.shipping}>
                  Est. Shipping: ${shipping}
                </div>
                <div className={styles.tax}>Tax: ${tax}</div>
              </div>

              <div className={styles.total}>Total (USD): ${totalPrice}</div>

              <NavLink className={styles.complete} to="/checkout/complete">
                <button className={styles.completeButton}>
                  Complete checkout
                </button>
              </NavLink> */}
            </>
          );
        })}
        <div className={styles.pricing}>
          <div className={styles.subtotal}>Subtotal: ${cartPrice}</div>
          <div className={styles.shipping}>Est. Shipping: ${shipping}</div>
          <div className={styles.tax}>Tax: ${tax}</div>
        </div>

        <div className={styles.total}>Total (USD): ${totalPrice}</div>

        <NavLink className={styles.complete} to="/checkout/complete">
          <button className={styles.completeButton}>
            {/* <button
            onClick={async (e) => {
              e.preventDefault();
              await dispatch(cartClear());
            }}
            className={styles.completeButton}
          > */}
            Complete checkout
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Checkout;
