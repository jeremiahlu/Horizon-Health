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

const ReviewForm = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const itemsObj = useSelector((state) => state.items);
  const items = Object.values(itemsObj);
  // console.log(id, 'item')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let payload = {
      itemId: id,
      review,
      stars,
    };

    try {
      await dispatch(addReviewThunk(payload));
      dispatch(getAllReviewThunk(item));
      setStars("");
      setReview("");
    } catch (res) {
      const data = await res.json();
      const err = [data.message];
      if (data && data.message) setErrors(err);
    }
  };

  const radios = document.querySelectorAll('input[type="radio"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      setStars(event.target.value);
    });
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Write a review</h1>
      {errors && (
        <ul>
          {errors.map((error, idx) => (
            <li className="errors" key={idx}>
              {error}
            </li>
          ))}
        </ul>
      )}

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />

      <form>
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
      </form>

      <input type="submit" />
    </form>
  );
};

export default ReviewForm;
