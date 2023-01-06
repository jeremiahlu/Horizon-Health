import styles from "./Items.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";

const Item = ({ cart, setCart }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const allItems = useSelector((state) => state.items);
  const itemValues = Object.values(allItems);
  // console.log(itemValues, "HERE");

  // const filtered = useMemo(() => {
  //   return allItems?.filter((item) => {
  //     return item.toLowerCase().includes(search.toLowerCase());
  //   });
  // }, [allItems, search]);

  const cartAdd = (item) => {
    let newCart = [...cart];
    let cartItems = newCart.find((product) => item.name == product.name);
    // console.log(cart, "CARTITEMS");
    {
      if (cartItems) {
        cartItems.quantity++;
      } else {
        cartItems = {
          ...item,
          quantity: 1,
        };
        newCart.push(cartItems);
      }
      setCart(newCart);
    }
  };

  useEffect(() => {
    const getItems = async () => {
      await dispatch(getItemsThunk());
    };
    getItems();
  }, [dispatch]);

  return (
    <div className={styles.itemsContainer}>
      <div className={styles.itemsList}>
        {itemValues?.map((item, index) => {
          const itemId = itemValues[index].id;

          return (
            <div className={styles.product}>
              <NavLink
                key={itemId}
                className={styles.image}
                to={`/items/${itemId}`}
              >
                <img className={styles.image} src={item.image} alt="image" />
                <h1 className={styles.name}>{item.name}</h1>
              </NavLink>

              <div className={styles.footer}>
                <div className={styles.price}>Price: ${item.price}</div>
                <button className={styles.cart} onClick={() => cartAdd(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Item;
