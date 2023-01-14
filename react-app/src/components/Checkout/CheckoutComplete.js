import styles from "./Checkout.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import { fetchCart, addCartItem, removeCartItem } from "../../store/cart";

const Complete = ({ cart }) => {
  return (
    <>
      <div className={styles.completeContainer}>Hi</div>
    </>
  );
};

export default Complete;
