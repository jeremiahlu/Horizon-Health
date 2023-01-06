import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getItemById } from "../../store/item";
import styles from "./Items.module.css";
import Reviews from "../Reviews/index";
import ReviewForm from "../Reviews/ReviewForm";
import EditReviewForm from "../Reviews/EditReviewForm";

function ItemDetails({ cart, setCart }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state) => state.items[id]);
  const reviewState = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewState);
  // console.log(reviews, 'reviews')
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(cart, "cart");

  const cartAdd = (item) => {
    let newCart = [...cart];
    // console.log("here");
    let cartItems = newCart.find((product) => item?.name === product?.name);
    {
      if (cartItems) {
        cartItems.quantity += 1;
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
    (async () => {
      try {
        await dispatch(getItemById({ id }));
      } catch (err) {}
    })();
  }, [dispatch, id]);

  return (
    <>
      item && (
      <div className={styles.productDetail}>
        <div className={styles.productContainer}>
          <div className={styles.photoMain}>
            <i className={`${styles.icon}fa-regular fa-heart`}></i>
            <img className={styles.itemImage} src={item?.image} />
          </div>
        </div>

        <div className={styles.itemDetailDiv}>
          <div className={styles.itemName}>{item?.name}</div>
          <div className={styles.itemPrice}>${item?.price}</div>
          <button className={styles.addToCart} onClick={() => cartAdd(item)}>
            ADD TO CART
          </button>
          <div className={styles.itemDescription}>{item?.description}</div>
        </div>

        <div className={styles.reviews}>
          <ReviewForm item={item} />
          <Reviews item={item} />
          {/* {reviews.forEach((review) =>
            review.user_id === sessionUser.id ? (
              <button>
                {" "}
                <EditReviewForm />{" "}
              </button>
            ) : (
              <></>
            )
          )} */}
        </div>
      </div>
      )
    </>
  );
}

export default ItemDetails;
