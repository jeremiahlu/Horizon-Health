import styles from "./Cart.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import { fetchCart } from "../../store/cart";
// import { Item } from "./Item";

const Cart = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const cartPrice = cart.reduce((a, b) => a + b.quantity * b.price, 0);
  const tax = cartPrice * 0.06;
  const shipping = cartPrice * 0.03;
  const totalPrice = cartPrice + tax;
  const item = useSelector((state) => state.items);
  const cartState = useSelector((state) => state.cart);
  // console.log(cartState, "CART");

  const clearCart = () => {
    setCart([]);
  };

  const newCart = [...cart];
  let quantity = newCart.map((item) => item.quantity);
  let totalQuantity = quantity.reduce((a, b) => a + b, 0);

  const cartQuantity = (item, price) => {
    const names = newCart.map((item) => item.name);
    const prices = newCart.map((item) => item.price);
    const cartItem = names.find((product) => product.name == item.name);

    // if (cartItem) {
    price = quantity.map((value, index) => value * prices[index]);
    console.log(price, "price");
    console.log(prices, "PRICES");
    console.log(quantity, "quantity");
    console.log(names, "names");
    console.log(cart, "cart");
    // }
    // newCart.find(
    //   (product, index) => product.name == item[index].name
    // ).quantity = price;

    setCart(newCart);
  };

  // const removeFromCart = (item) => {
  //   setCart(cart.filter((product) => product !== item));
  // };

  const addToCart = (item) => {
    item.quantity += 1;
  };

  const removeFromCart = (item) => {
    item.quantity <= 0
      ? setCart(cart.filter((product) => product !== item))
      : (item.quantity -= 1);
  };

  const cartTotal = () => {
    return cart
      .reduce((sum, { price, quantity }) => sum + price * quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    const getCart = async () => {
      await dispatch(fetchCart());
    };
    getCart();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {setCart.length === 0 && <div>Cart is empty</div>}

      <h1 className={styles.cartHeader}>Cart({totalQuantity})</h1>

      <div>
        {cart.map((item, index) => (
          <div className={styles.cartItem} key={index}>
            <div className={styles.itemDetails}>
              <img className={styles.image} src={item?.image} />

              <div className={styles.namePrice}>
                <div>{item?.name}</div>
                <div>${item?.price}</div>
              </div>
            </div>

            <div className={styles.adjust}>
              <div>
                <button
                  className={styles.remove}
                  onClick={() => removeFromCart(item)}
                >
                  -
                </button>
                <input
                  className={styles.quantity}
                  value={item.quantity}
                  onChange={(e) =>
                    cartQuantity(items, parseInt(e.target.value))
                  }
                />
                <button onClick={() => addToCart(item)}>+</button>
              </div>
              {/* <button
                className={styles.remove}
                onClick={() => removeFromCart(item)}
              >
                Remove Item
              </button> */}
            </div>
          </div>
        ))}

        {cart.length > 0 && <button onClick={clearCart}>Clear cart</button>}
      </div>
      <div className={styles.total}>Total: ${cartTotal()}</div>
      <button>Check out</button>
      <NavLink className={styles.continueShopping} to="/items">
        Continue shopping
      </NavLink>
    </div>
  );
};

export default Cart;
