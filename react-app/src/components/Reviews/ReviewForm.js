import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getAllReviewThunk,
  addReviewThunk,
  editReviewThunk,
  deleteReviewThunk,
} from "../../store/review";
import styles from "./Reviews.module.css";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("1");
  const [hover, setHover] = useState(null);
  const [errors, setErrors] = useState([]);
  const itemsObj = useSelector((state) => state.items);
  const items = Object.values(itemsObj);
  const user = useSelector((state) => state.session.user);
  // console.log(id, "item");
  const radios = document.querySelectorAll('input[type="radio"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      setStars(e.target.value);
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let payload = {
      // user_id: user.id,
      itemId: id,
      review,
      stars: stars,
    };

    document.querySelector('input[type="radio"]').checked = false;
    await dispatch(addReviewThunk(payload));
    // dispatch(getAllReviewThunk(item));
    history.push(`/items/${item.id}`);
    setStars("");
    setReview("");

    // try {
    // } catch (res) {
    //   const data = await res.json();
    //   const err = [data.message];
    //   if (data && data.message) setErrors(err);
    // }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Write a review</h1>
      {/* {errors && (
        <ul> */}
      <div>
        {errors.map((error, idx) => (
          <li className={styles.error} key={idx}>
            {error}
          </li>
        ))}
      </div>
      {/* </ul> */}
      {/* )} */}

      <input
        className={styles.textarea}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
        pattern="^(?!\s*$).+"
        minLength={1}
        maxLength={50}
      />

      {}
      <div>
        {[...Array(5)].map((star, idx) => {
          return (
            <label>
              <input
                key={idx}
                type="radio"
                name="rating"
                value={idx + 1}
                onClick={() => setStars(idx + 1)}
              />
              {/* <span className={`${styles.star} active`}>★</span> */}
              <FaStar
                className={`${styles.star} active`}
                color={idx + 1 <= (hover || stars) ? "#ffcc00" : "#ccc"}
                onMouseEnter={() => setHover(idx + 1)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
            // <label>
            //   <input type="radio" name="rating" value="2" />
            //   <span className={styles.star}>★</span>
            // </label>
            // <label>
            //   <input type="radio" name="rating" value="3" />
            //   <span className={styles.star}>★</span>
            // </label>
            // <label>
            //   <input type="radio" name="rating" value="4" />
            //   <span className={styles.star}>★</span>
            // </label>
            // <label>
            //   <input type="radio" name="rating" value="5" />
            //   <span className={styles.star}>★</span>
            // </label>
          );
        })}
      </div>

      <input className={styles.submitReview} type="submit" />
    </form>
  );
};

export default ReviewForm;
