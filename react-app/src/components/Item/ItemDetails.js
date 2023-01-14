import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getItemById } from "../../store/item";
import styles from "./Items.module.css";
import Reviews from "../Reviews/index";
import ReviewForm from "../Reviews/ReviewForm";
import EditReviewForm from "../Reviews/EditReviewForm";
import cartReducer, {
  fetchCart,
  addCartItem,
  removeCartItem,
} from "../../store/cart";

function ItemDetails({ cart }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state) => state.items[id]);
  const reviewState = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewState);
  // console.log(reviews, 'reviews')
  const user = useSelector((state) => state.session.user);
  // console.log(cart, "cart");

  const cartAdd = async (item, e) => {
    e.preventDefault();

    let payload = {
      cart_id: user?.id,
      item_id: item?.id,
      // quantity: 1,
    };
    await dispatch(addCartItem(payload));
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
      item? && (
      <div className={styles.shell}>
        <div className={styles.itemDetailContainer}>
          <div className={styles.productDetail}>
            <div className={styles.productContainer}>
              <div className={styles.photoMain}>
                {/* <i className={`${styles.icon}fa-regular fa-heart`}></i> */}
                <img className={styles.itemImage} src={item?.image} />
              </div>
            </div>

            <div className={styles.itemDetailDiv}>
              <div className={styles.itemName}>{item?.name}</div>
              <div className={styles.itemPrice}>${item?.price}</div>
              <button
                className={styles.addToCart}
                onClick={(e) => cartAdd(item, e)}
              >
                <span>ADD TO CART</span>
                <i className={`${styles.check}fa-sharp fa-solid fa-check`}></i>
              </button>
              <div className={styles.itemDescription}>{item?.description}</div>
            </div>
            <div className={styles.reviews}>
              <ReviewForm item={item} />
              <Reviews item={item} />
            </div>
          </div>
          )
        </div>
      </div>
    </>
  );
}

export default ItemDetails;
