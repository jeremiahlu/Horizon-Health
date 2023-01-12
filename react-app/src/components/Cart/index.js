import styles from "./Cart.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import cartReducer, {
  fetchCart,
  addCartItem,
  removeCartItem,
} from "../../store/cart";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  // const [items, setItems] = useState([]);
  // const [total, setTotal] = useState(0);
  const items = useSelector((state) => state.items);

  const user = useSelector((state) => state.session.user);

  const itemState = useSelector((state) => Object.values(state.items));
  // console.log(itemState, "fhdsoa");

  const myCart = useSelector((state) => Object.values(state.cart));

  const addToCart = async (item, e) => {
    e.preventDefault();
    let payload = {
      cart_id: user?.id,
      item_id: item?.item_id,
      quantity: 1,
    };

    let newCart = [...cart];
    const itemNames = newCart.map((item) => item.item_id);
    let cartItems = itemNames.find((product) => item.id == product);
    let cartItemName = newCart.find((item) => item.item_id === cartItems);

    {
      // if (cartItemName) {
      //   cartItemName.quantity += 1;
      //   console.log("HAT");
      // } else {
      //   console.log("HIT");
      //   // cartItems = {
      //   //   ...item,
      //   //   quantity: 1,
      //   // };
      //   cartItemName.quantity = 1;
      //   newCart.push(cartItemName);
      // }
      await dispatch(addCartItem(payload));
    }
  };
  // console.log(cart, "CARTHREA");
  const removeFromCart = async (item) => {
    // console.log(item, "ITEM");
    let newCart = [...cart];
    let cartItems = newCart.find((product) => item?.name == product.name);
    if (cartItems && cartItems.quantity > 0) cartItems.quantity -= 1;
    await dispatch(
      removeCartItem({ item_id: item.item_id, cart_id: user?.id })
    );
  };

  // const cartItemIds = cart.map((item) => item.item.id);
  // const cartItemQuantityObj = cartItemIds.reduce((a, b) => {
  //   a[b] = (a[b] || 0) + 1;
  //   return a;
  // }, {});
  // const cartItemQuantityArr = Object.values(cartItemQuantityObj);
  // const cartItemQuantity = cartItemQuantityArr.reduce((a, b) => a + b, 0);
  // console.log(cartItemQuantity, "CIQ");

  // const cartVal = Object.values(cartState);
  // const cartList = cartVal.map((item) => item?.item_id);
  // console.log(myCart, "22");
  // const itemIds = myCart.map((item) => item.item_id);
  // // console.log(itemIds, "INFO");
  // const itemId = itemIds.filter((item) => myCart.includes(item.item_id));
  // console.log(itemId, "ITEMID");

  // const cartItemState = useSelector((state) => Object.values(state.cartItem));

  // const cartItem = useSelector((state) => state.cartItem);
  // console.log(cartItem, "1");

  // const cartItemList = cartItemState.map((item) => item?.item_id);
  // console.log(cartItemList, "2");

  // let cartItems = itemList.filter((item) => )

  // const clearCart = () => {
  //   setCart([]);
  // };
  // console.log(cart, "CART");

  // const newCart = [...cart];
  // // console.log(newCart, "NEWCART");

  let quantity = cart.map((item) => item.quantity);
  // console.log(quantity, "HASDA");
  let totalQuantity = quantity.reduce((a, b) => a + b, 0);

  const cartQuantity = (item, price) => {
    const names = cart.map((item) => item.item.name);
    const prices = cart.map((item) => item.item.price);
    const cartItem = names.find((product) => product.name == item.item.name);

    price = quantity.map((value, index) => value * prices[index]);

    // setCart(newCart);
  };

  // const addToCart = (item) => {
  //   let newCart = [...cart];
  //   let cartItems = newCart.find((product) => item.name == product.name);

  //   {
  //     if (cartItems) {
  //       cartItems.quantity++;
  //     } else {
  //       cartItems = {
  //         ...item,
  //         quantity: 1,
  //       };
  //       newCart.push(cartItems);
  //     }
  //     setCart(newCart);
  //     dispatch(addCartItem(cartItems));
  //   }
  // };

  let cartPrice = cart.reduce((a, b) => a + b.quantity * b.item.price, 0);
  // console.log(cart, "CARTPRICE");
  let tax = parseInt(cartPrice * 0.06).toFixed(2);
  let shipping = parseInt(cartPrice * 0.03).toFixed(2);
  let totalPrice = parseInt(cartPrice + +tax + +shipping).toFixed(2);

  // const removeFromCart = async (item) => {
  //   item.quantity > 0
  //     ? (item.quantity -= 1)
  //     : setCart(cart.filter((product) => product !== item));
  //   await dispatch(removeCartItem(item));
  // };

  const cartTotal = () => {
    return cart
      .reduce((sum, { price, quantity }) => sum + price * quantity, 0)
      .toFixed(2);
  };

  const cartMap = cart.map((item) => item.item_id);
  // console.log(cartMap, "REIARHOASA@$!#!@");

  useEffect(() => {
    const getCart = async () => {
      await dispatch(fetchCart(user?.id));
    };
    getCart();
  }, [dispatch]);

  // console.log(items, "ITEMS");

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
  }, [dispatch, items]);

  useEffect(() => {
    // console.log(items, "HREADS");
    if (items) {
      for (let item in items) {
        let item_id = items[item].id;
        const delItem = async () => {
          await dispatch(
            removeCartItem({ item_id: item_id, cart_id: user?.id })
          );
        };
        delItem();
      }
    }
  }, [dispatch, items]);

  useEffect(() => {
    const getItems = async () => {
      await dispatch(getItemsThunk());
    };
    getItems();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {myCart.length === 0 && <div className={styles.empty}>Cart is empty</div>}

      <div className={styles.cartList}>
        <h1 className={styles.title}>Shopping Cart</h1>
        {cart?.map((item, index) => {
          let newCart = [...cart];
          let cartItems = newCart.find((product) => item?.name == product.name);
          // console.log(cartItems, "CAHIWOQDA");

          return (
            <div className={styles.cartItem} key={index}>
              <img className={styles.image} src={item?.item.image} />
              <div className={styles.itemDetails}>
                <div className={styles.nameQuant}>
                  <div className={styles.name}>{item?.item.name}</div>
                  <span className={styles.stock}> In Stock </span>
                  <div className={styles.adjust}>
                    <div>
                      <button
                        className={styles.remove}
                        onClick={(e) => removeFromCart(item, e)}
                      >
                        {/* <button className={styles.remove}> */}
                        <i
                          className={`${styles.up} fa-solid fa-chevron-down`}
                        ></i>
                      </button>
                      {/* {console.log(cartItems.quantity, "CARTITEMS132412")} */}
                      <input
                        className={styles.quantity}
                        value={item?.quantity}
                        onChange={(e) =>
                          cartQuantity(items, parseInt(e.target.value))
                        }
                      />
                      <button onClick={(e) => addToCart(item, e)}>
                        <i
                          className={`${styles.up} fa-solid fa-chevron-up`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.price}>${item?.item.price}</div>

                {/* <button
                  className={styles.remove}
                  onClick={() => removeFromCart(item)}
                >
                  Remove Item
                </button> */}
              </div>
            </div>
          );
        })}
        {/* {cart.length > 0 && (
          <button className={styles.clear} onClick={clearCart}>
            Clear cart
          </button>
        )} */}
        <NavLink className={styles.continueShopping} to="/items">
          Continue shopping
        </NavLink>
      </div>

      <div className={styles.checkoutDiv}>
        <h1 className={styles.cartHeader}>Cart ({totalQuantity})</h1>
        <div className={styles.subtotal}>
          Subtotal ({totalQuantity} items): ${cartPrice}
        </div>
        <div className={styles.shipping}>Est. Shipping: ${shipping}</div>
        <div className={styles.tax}>Tax: ${tax}</div>
        <div className={styles.total}>Total Price: ${totalPrice}</div>
        <button className={styles.checkout}>Proceed to checkout</button>
      </div>
    </div>
  );
};

export default Cart;
