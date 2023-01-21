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
    <div className={styles.thankYouContainer}>
      <div className={styles.completeContainer}>
        <img
          src="https://i.pinimg.com/564x/8d/29/ef/8d29ef579d2a0b86886f53673a5324da.jpg"
          default=""
          className={styles.logo}
        />
        <div className={styles.thankYou}>Thank you for your order!</div>
        <div className={styles.address}>
          Your order should arrive at {user.address} within 5-7 business days.
        </div>
      </div>
      <div className={styles.customerInfo}>
        <span className={styles.customerDetail}> DELIVERY INFORMATION</span>
        <div className={styles.personalInfo}>
          <div>Order by {user.first_name + " " + user.last_name}</div>
          <div>Shipped to {user.address}</div>
          <div>Billing address {user.address}</div>
          <div className={styles.email}>
            A confirmation email will be sent to {user.email}{" "}
          </div>
        </div>
      </div>
      <div className={styles.text}>
        We've received your order and the items are being carefully packaged.
        You will receive an email regarding your tracking number after your
        order is picked up from parcel services. The estimated delivery time is
        updated as the parcel is collected. While our shipping partners do their
        outmost to deliver to your doorstep on the date provided, it remains an
        estimation.
      </div>
      <div className={styles.buttons}>
        <NavLink className={styles.continueShopping} to="/items">
          <button className={styles.continueButton}>Continue shopping</button>
        </NavLink>
        <NavLink className={styles.home} to="/">
          <button className={styles.homeButton}>Return to home</button>
        </NavLink>
      </div>
      <div className={styles.footer}>
        <span className={styles.copyright}>
          Copyright © Horizon Health 2022.{" "}
        </span>
      </div>
    </div>
  );
};

export default Complete;
