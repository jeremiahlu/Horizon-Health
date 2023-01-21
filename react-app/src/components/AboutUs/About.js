import styles from "./About.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import cartReducer, {
  fetchCart,
  addCartItem,
  removeCartItem,
} from "../../store/cart";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.links}>
        <Link to="https://github.com/jeremiahlu">Github</Link>
        <Link to="https://www.linkedin.com/in/jeremiah-lu/">Linked</Link>
      </div>
    </div>
  );
};

export default About;
