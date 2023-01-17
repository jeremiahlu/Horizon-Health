import styles from "./Checkout.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import { fetchCart, addCartItem, removeCartItem } from "../../store/cart";

const Complete = ({ cart }) => {
  const user = useSelector((state) => state.session.user);
  // console.log(user, "USER");

  return (
    <>
      <div className={styles.completeContainer}>
        <div className={styles.thankYou}>Thank you for your order</div>
        <div className={styles.address}>
          Your order should arrive at {user.address} within 5-7 business days.
        </div>
      </div>
    </>
  );
};

export default Complete;
