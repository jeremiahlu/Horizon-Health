import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getMyReviews,
  editReviewThunk,
  deleteReviewThunk,
} from "../../store/review";
import styles from "./Reviews.module.css";
import { FaStar } from "react-icons/fa";

function EditReviewForm({ review, onClose }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  // const { id } = useParams();
  const history = useHistory();

  // useEffect(() => {
  //   dispatch(getMyReviews());
  // }, [dispatch]);

  // const reviewById = useSelector((state) => state.reviews[id]);
  // console.log(review, "hreasda");

  // const [reviews, setReview] = useState(review?.review);
  const [stars, setStars] = useState(review?.stars);
  const [reviews, setReview] = useState("");
  const [hover, setHover] = useState(null);
  // const [stars, setStars] = useState("");

  // console.log(typeof review.stars, "HIOAASDAS");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let payload = {
      id: review?.id,
      review: reviews || review,
      stars: stars || stars,
    };

    // await dispatch(editReviewThunk(payload));
    // onClose();
    try {
      await dispatch(editReviewThunk(payload));
      onClose();
    } catch (res) {
      setErrors([]);
      const data = await res.json();

      if (data && data.errors) setErrors(data.errors);
    }
  };

  const radios = document.querySelectorAll('input[type="radio"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      setStars(Number(event.target.value));
    });
  });

  return (
    <form className={styles.editReview} onSubmit={handleSubmit}>
      <h2>Edit Review</h2>
      {errors && (
        <ul>
          {errors.map((error, idx) => (
            <li className={styles.error} key={idx}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <div>
        <input
          className={styles.textarea}
          type="text"
          value={reviews}
          onChange={(e) => setReview(e.target.value)}
          required
          pattern="^(?!\s*$).+"
          minLength={1}
          maxLength={50}
        />
      </div>
      {/* <form>
        <label>
          <input type="radio" name="rating" value="1" />
          <span className={styles.star}>★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="2" />
          <span className={styles.star}>★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="3" />
          <span className={styles.star}>★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="4" />
          <span className={styles.star}>★</span>
        </label>
        <label>
          <input type="radio" name="rating" value="5" />
          <span className={styles.star}>★</span>
        </label>
      </form> */}
      <div className={styles.starRatings}>
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
          );
        })}
      </div>

      <input className={styles.submitEditedReview} type="submit" />
    </form>
  );
}

export default EditReviewForm;
