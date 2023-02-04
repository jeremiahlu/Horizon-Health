import React, { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import LogoutButton from "../auth/LogoutButton";
// import './Sidebar.css'
import styles from "./Sidebar.module.css";
// import SignUpForm from "../auth/SignupForm";
import SignUpFormModal from "../auth/SignUpIndex";
import LoginFormModal from "../auth/LogInIndex";
import LoginForm from "../auth/LogInFormModal";
import cartReducer, { fetchCart, addCartItem } from "../../store/cart";

const Sidebar = ({ cart }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sidebarToggle = () => {
    document.body.classList.toggle("open");
  };
  // const newCart = [...cart];
  // let quantity = newCart.map((item) => item.quantity);
  // let totalQuantity = quantity.reduce((a, b) => a + b, 0);
  // console.log(cartQuantity, "CART");

  const cartItemIds = cart.map((item) => item?.item?.id);
  const cartItemQuantityObj = cartItemIds.reduce((a, b) => {
    a[b] = (a[b] || 0) + 1;
    return a;
  }, {});
  const cartItemQuantityArr = Object.values(cartItemQuantityObj);
  const cartItemQuantity = cartItemQuantityArr.reduce((a, b) => a + b, 0);

  const logOut = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };
  let quantity = cart.map((item) => item.quantity);
  // console.log(quantity, "HASDA");
  let totalQuantity = quantity.reduce((a, b) => a + b, 0);

  // const loggedSession = useSelector((state) => state.session.user);
  const items = useSelector((state) => state.items);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const getCart = async () => {
      await dispatch(fetchCart(user?.id));
    };
    getCart();
  }, [dispatch]);

  useEffect(() => {
    if (items) {
      for (let item in items) {
        let item_id = items[item].id;
        const addItem = async () => {
          await dispatch(addCartItem({ item_id: item_id, cart_id: user?.id }));
        };
        addItem();
      }
    }
  }, [dispatch]);

  return user ? (
    <div className={styles.sidebarMain}>
      <div className={styles.topNav}>
        <button className={styles.button} onClick={sidebarToggle()}>
          <i className={`${styles.icon} fa-solid fa-bars`}></i>
        </button>

        <button className={styles.button}>
          <NavLink to="/" exact={true} className={styles.active}>
            <i className={`${styles.icon} fa-sharp fa-solid fa-house`}></i>
            <div className={styles.iconText}> Home </div>
          </NavLink>
        </button>

        {/* <button className={styles.button}>
            <NavLink to="/login" exact={true} className={styles.active}>
              <i
                className={`${styles.icon} fa-sharp fa-solid fa-right-to-bracket`}
              ></i>
              <div
                className={styles.iconText}
                style={{ animationDelay: "0.1s" }}
              >
                {" "}
                Log in{" "}
              </div>
            </NavLink>
          </button>

          <button className={styles.button}>
            <NavLink to="/sign-up" exact={true} className={styles.active}>
              <i className={`${styles.icon} fa-solid fa-user-plus`}></i>
              <div
                className={styles.iconText}
                style={{ animationDelay: "0.2s" }}
              >
                {" "}
                Sign up{" "}
              </div>
            </NavLink>
          </button> */}

        <button className={styles.button}>
          <NavLink to="/account" exact={true} className={styles.active}>
            <i className={`${styles.icon} fa-solid fa-user`}></i>
            <div className={styles.iconText} style={{ animationDelay: "0.3s" }}>
              {" "}
              Account{" "}
            </div>
          </NavLink>
        </button>

        <button className={styles.button}>
          <NavLink to="/maps" exact={true} className={styles.active}>
            <i
              className={`${styles.icon} fa-sharp fa-solid fa-map-location-dot`}
            ></i>
            <div className={styles.iconText} style={{ animationDelay: "0.3s" }}>
              {" "}
              Map{" "}
            </div>
          </NavLink>
        </button>

        <button className={styles.button}>
          <NavLink to="/items" exact={true} className={styles.active}>
            <i className={`${styles.icon} fa-sharp fa-solid fa-store`}></i>
            <div className={styles.iconText} style={{ animationDelay: "0.3s" }}>
              {" "}
              Store{" "}
            </div>
          </NavLink>
        </button>

        <button className={styles.button}>
          <NavLink
            to={`/cart/${user.id}/items`}
            exact={true}
            className={styles.active}
          >
            <i className={`${styles.icon} fa-sharp fa-solid fa-cart-shopping`}>
              {" "}
              <div className={`${styles.redCircle}`}>{totalQuantity}</div>
            </i>
            {/* <div className={`${styles.redCircle}`}>3</div> */}
            <div className={styles.iconText} style={{ animationDelay: "0.3s" }}>
              {" "}
              Cart{" "}
            </div>
          </NavLink>
        </button>

        {/* <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton> */}
      </div>

      <div className={styles.logOutDiv}>
        <button className={styles.button} onClick={logOut}>
          <i
            className={`${styles.icon} fa-solid fa-person-walking-arrow-right`}
          ></i>
          <div className={styles.logOutText} style={{ animationDelay: "0.3s" }}>
            {" "}
            Log out{" "}
          </div>
        </button>
      </div>
      {/* </nav> */}
    </div>
  ) : (
    // </div>
    <div className={styles.sidebarMain}>
      <div className={styles.topNav}>
        {/* <button className={styles.button}>
          <NavLink to="/login" exact={true} className={styles.active}>
            <i
              className={`${styles.icon} fa-sharp fa-solid fa-right-to-bracket`}
            ></i>
            <div className={styles.iconText} style={{ animationDelay: "0.1s" }}>
              {" "}
              Log in{" "}
            </div>
          </NavLink>
        </button> */}
        <LoginFormModal className={styles.modal} />
        {/* <button className={styles.button}> */}
        {/* <NavLink to="/sign-up" exact={true} className={styles.active}> */}
        <SignUpFormModal className={styles.modal} />

        {/* <div className={styles.iconText} style={{ animationDelay: "0.2s" }}>
          {" "}
          Sign up{" "}
        </div> */}
        {/* </NavLink> */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
